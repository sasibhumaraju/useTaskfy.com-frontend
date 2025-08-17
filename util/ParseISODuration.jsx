const parseISODuration = (isoDuration) => {
   const regex = /PT(?:(\d+)H)?(?:(\d+)M)?/; // Regex for hours (optional) and minutes (optional)
    const match = isoDuration.match(regex);
    
    let hours = 0;
    let minutes = 0;

    if (match) {
        hours = parseInt(match[1]) || 0; // Capture group 1 is hours, default to 0 if not present
        minutes = parseInt(match[2]) || 0; // Capture group 2 is minutes, default to 0 if not present
    }
    
  return { hours: hours, minutes: minutes };
}

export default parseISODuration;