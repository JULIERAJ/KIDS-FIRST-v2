// Helper function to check if the event spans multiple days
export const isMultiDay = (startDate, endDate) => {
    return endDate.getDate() > startDate.getDate() ||
        endDate.getMonth() > startDate.getMonth() ||
        endDate.getFullYear() > startDate.getFullYear();
};

// Function to format date and time
export const formatEventTime = (startDate, endDate) => {
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const dateOptions = { weekday: 'short', day: '2-digit', month: 'short' };
    const startTime = startDate.toLocaleTimeString('en-GB', timeOptions);
    const endTime = endDate.toLocaleTimeString('en-GB', timeOptions);
    const startDateFormatted = startDate.toLocaleDateString('en-GB', dateOptions);
    const endDateFormatted = endDate.toLocaleDateString('en-GB', dateOptions);

    if (isMultiDay(startDate, endDate)) {
        return `${startTime}, ${startDateFormatted} - ${endTime}, ${endDateFormatted}`;
    } else {
        return `${startTime} - ${endTime} ${startDateFormatted}`;
    }
};