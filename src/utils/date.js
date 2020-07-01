const treatAsUTC = date => {
    const newDate = new Date(date);
    const value = newDate.setMinutes(
        newDate.getMinutes() - newDate.getTimezoneOffset(),
    );
    return value;
};

export const expiresIn = expires => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000;

    const time = Math.ceil(
        (treatAsUTC(expires) - Date.now()) / millisecondsPerDay,
    );
    return time;
};
