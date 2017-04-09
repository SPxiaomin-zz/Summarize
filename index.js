// TODO: stop 按需求写代码
// TODO: 字符串转数字的几种方式学习 Number/parseInt/parserFloat，
//       各种方法的限制，自己测试一下，然后总结输出博客。

/**
 * 需求:
 * 1. 计算7天的技术学习时间；
 * 2. 计算7天的通术学习时间；
 * 3. 计算 技+通 学习时间；
 * 4. 计算平均、最高、最低学习时间；
 * 5. 计算一周学习百分比；
 */

/**
 * 数据格式:

 传入参数
 {
     techLearnTimeCost: [],
     otherLearnTimeCost: []
     totalLearnTimeCostEveryDay: []
 }

 输出数据
 {
     totalTechLearnTimeCost: [h, m],
     totalOtherLearnTimeCost: [h, m],
     totalLearnTimeCost: [h, m]
 }

 */


// TODO: 看下 jsDoc ，怎么写 argument/return/函数描述
/**
 *
 */
function computeTotalTimeCost(timeCost) {
    const REGEXP = /^(\d+?)h(\d+?)m|(\d+?)h|(\d+?)m$/;
    let totalTimeCost;

    totalTimeCost = timeCost.reduce((acc, item) => {
        let tmp = item.match(REGEXP);

        if (item.indexOf('m') < 0) {
            // 只有 h 的情况
            return [acc[0] + Number(tmp[3]), acc[1]];
        } else if (item.indexOf('h') < 0) {
            // 只有 m 的情况
            return [acc[0], acc[1] + Number(tmp[4])];
        } else {
            return [acc[0] + Number(tmp[1]), acc[1] + Number(tmp[2])];
        }
    }, [0, 0]);

    return totalTimeCost;
}

/**
 *
 */
function computeBiggestAndSmallestTotalLearnTimeCostEveryDay(timeCost) {
    const REGEXP = /^(\d+?)h(\d+?)m|(\d+?)h|(\d+?)m$/;

    timeCost = timeCost.map((item) => {
        let tmp = item.match(REGEXP);

        if (item.indexOf('m') < 0) {
            // 只有 h 的情况
            return Number(tmp[3]);
        } else if (item.indexOf('h') < 0) {
            // 只有 m 的情况
            return Number(tmp[4]) / 60;
        } else {
            return Number(tmp[1]) + Number(tmp[2]) / 60;
        }
    });

    timeCost.sort();

    return {
        smallestTotalLearnTimeCostEveryDay: timeCost[0],
        biggestTotalLearnTimeCostEveryDay: timeCost[timeCost.length - 1]
    }
}

/**
 *
 */
function Summarize(timeCost) {
    // 从字符串中抽取时间的正则
    const REGEXP = /^(\d+?)h(\d+?)m|(\d+?)h|(\d+?)m$/;

    // 一周总时间
    const ONEWEEK = 168;

    // 一周技术学习时间花费
    const TECHLEARNTIMECOST = timeCost.techLearnTimeCost;

    // 一周其他学习时间花费
    const OTHERLEARNTIMECOST = timeCost.otherLearnTimeCost;

    // 每天的总学习时间花费
    const TOTALLEARNTIMECOSTEVERYDAY = timeCost.totalLearnTimeCostEveryDay

    // 待输出的总结
    let summary = {};

    summary.totalTechLearnTimeCost = computeTotalTimeCost(TECHLEARNTIMECOST);
    summary.totalOtherLearnTimeCost = computeTotalTimeCost(OTHERLEARNTIMECOST);
    summary.totalLearnTimeCost = [
        summary.totalTechLearnTimeCost[0] + summary.totalOtherLearnTimeCost[0],
        summary.totalTechLearnTimeCost[1] + summary.totalOtherLearnTimeCost[1]
    ];
    summary.biggestAndSmallestTotalLearnTimeCostEveryDay = computeBiggestAndSmallestTotalLearnTimeCostEveryDay(TOTALLEARNTIMECOSTEVERYDAY);
    summary.averageTotalLearnTimeCostEveryDay = [
        summary.totalLearnTimeCost[0] / 7,
        summary.totalLearnTimeCost[1] / 7
    ];
    summary.percentage = (summary.totalLearnTimeCost[0] + summary.totalLearnTimeCost[1] / 60 ) / 168;

    console.log(summary);
}

module.exports = Summarize;
