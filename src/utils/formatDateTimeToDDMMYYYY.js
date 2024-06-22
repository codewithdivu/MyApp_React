export function formatDateTimeToDDMMYYYY(seconds, nanoseconds) {
    // Convert seconds to milliseconds
    const milliseconds = seconds * 1000;
    
    // Create a new Date object using the milliseconds
    const date = new Date(milliseconds);
    
    // Add nanoseconds to the milliseconds to get the final date
    date.setMilliseconds(date.getMilliseconds() + nanoseconds / 1e6);
  
    // Get day, month, and year from the date
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    // Construct the formatted date string in "dd/mm/yyyy" format
    const formattedDate = `${day}/${month}/${year}`;
    
    return formattedDate;
  }
  