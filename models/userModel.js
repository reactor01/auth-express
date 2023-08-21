const crypto = require('crypto')
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: [true, 'Please provide valid username'],
		},
		email: {
			type: String,
			required: [true, 'Please provide your email'],
			unique: true,
			lowercase: true,
			validate: [validator.isEmail, 'Please provide a valid email'],
		},
		role: {
			type: String,
			enum: ['user', 'guide', 'lead-guide', 'admin'],
			default: 'user',
		},
		password: {
			type: String,
			required: [true, 'Please provide a password'],
			minlength: 8,
			select: false,
		},
		passwordConfirm: {
			type: String,
			required: [true, 'Please confirm your password'],
			validate: {
				// This only works on CREATE and SAVE!!!
				validator: function (el) {
					return el === this.password
				},
				message: 'Passwords are not the same!',
			},
		},
		abilities: {
			type: Array,
			default: [
				{
					action: 'read',
					subject: 'User',
				},
			],
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		active: {
			type: Boolean,
			default: true,
			select: false,
		},
		isLoggedIn: {
			type: Boolean,
			default: false,
		},
		recentActivity: {
			type: Array,
			default: [
				{
					device: '',
					ip: '',
					lastLogin: '',
				},
			],
		},
		lastLoginDate: {
			type: Date,
			default: Date.now,
		},
		lastLoginDateArr: {
			type: Array,
			default: [],
		},
		loads: [
			{
				type: mongoose.Schema.ObjectId,
				ref: 'Load',
			},
		],
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	},
)

userSchema.set('timestamps', true)

userSchema.statics.login = function login(id, callback) {
	return this.findByIdAndUpdate(
		id,
		{ $set: { lastLoginDate: Date.now() }, new: true },
		callback,
	)
}

userSchema.pre('save', async function (next) {
	// Only run this function if password was actually modified
	if (!this.isModified('password')) return next()

	// Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12)

	// Delete passwordConfirm field
	this.passwordConfirm = undefined
	next()
})

userSchema.pre('save', function (next) {
	if (!this.isModified('password') || this.isNew) return next()

	this.passwordChangedAt = Date.now() - 1000
	next()
})

userSchema.pre(/^find/, function (next) {
	// this points to the current query
	this.find({ active: { $ne: false } })
	next()
})

// userSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'loads',
//     select: '-__v -user',
//   })

//   next()
// })

userSchema.methods.correctPassword = async function (
	candidatePassword,
	userPassword,
) {
	return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.checkLenght = async function () {
	return this.lastLoginDateArr.length
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
	if (this.passwordChangedAt) {
		const changedTimestamp = parseInt(
			this.passwordChangedAt.getTime() / 1000,
			10,
		)

		return JWTTimestamp < changedTimestamp
	}

	// False means NOT changed
	return false
}

userSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex')

	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex')

	// console.log({ resetToken }, this.passwordResetToken);

	this.passwordResetExpires = Date.now() + 10 * 60 * 1000

	return resetToken
}

const User = mongoose.model('User', userSchema)

module.exports = User
