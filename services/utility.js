const Utility = {
  /**
  Generate a date in mm/dd/yyyy format
  **/
  getDate: () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }
}

module.exports = Utility;
