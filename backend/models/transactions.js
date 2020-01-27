module.exports = (seq, dataType) => seq.define('transactions', {
  user_id: {
    type: dataType.STRING,
    allowNull: false,
  },
  date: {
    type: dataType.DATEONLY,
    allowNull: false,
  },
  category: {
    type: dataType.STRING,
    allowNull: false,
  },
  breakdown: {
    type: dataType.STRING,
    allowNull: false,
  },
  price: {
    type: dataType.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});
