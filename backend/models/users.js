module.exports = (seq, dataTypes) => seq.define('users', {
  user_id: {
    type: dataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  user_pw: {
    type: dataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});
