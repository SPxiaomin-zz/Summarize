const Summarize = require('./index');

const TIMECOST = {
    techLearnTimeCost: ['5h', '4h', '0h', '0h', '5h40m', '4h10m', '3h20m'],
    otherLearnTimeCost: ['1h45m', '2h55m', '1h20m', '50m', '1h45m', '1h25m', '1h20m'],
    totalLearnTimeCostEveryDay: ['6h45m', '6h55m', '1h20m', '50m', '7h25m', '5h35m', '4h40m']
};

Summarize(TIMECOST);
