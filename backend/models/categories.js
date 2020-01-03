module.exports = (seq, dataType) => {
  return seq.define('categories', {
    user_id: {
      type: dataType.STRING(20),
      allowNull: false,
    },
    category: {
      type: dataType.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: false,
  })
}