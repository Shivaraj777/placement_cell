// function to padd zeros
const padZero = (number) => {
    return number.toString().padStart(2, "0");
}
  
// convert date to mm/dd/yyy hh:mm format
module.exports.formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? " PM" : " AM";
  
    // Convert hours to 12-hour format and handle midnight (12:00am) and noon (12:00pm)
    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }
  
    return `${month}/${day}/${year} ${hours}:${padZero(minutes)}${period}`;
}