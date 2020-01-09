const Utility = {
  /**
  Generate a date in mm/dd/yyyy format
  **/
  getDate: (date=new Date()) => {
    let today = date;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return today;
  }
}

module.exports = Utility;
