module.exports = (seq, dataType) => {
  return seq.define('transactions', {
    user_id: {
      type: dataType.STRING(20),
      allowNull: false,
    },
    date: {
      type: dataType.DATEONLY,
      allowNull: false,
    },
    breakdown: {
      type: dataType.STRING(100),
      allowNull: false,
    },
    price: {
      type: dataType.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};