const zeroOutDate = (date) => {
    const zeroedDate = new Date(
      Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
    ).toISOString(); // This gives "YYYY-MM-DDT00:00:00.000Z"
    return zeroedDate.replace("Z", "+00:00");
  };

  module.exports = {zeroOutDate};