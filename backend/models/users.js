module.exports = (seq, dataTypes) => {
  return seq.define('users', {
    user_id: {
      type: dataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    user_pw: {
      type: dataTypes.STRING(20),
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
}