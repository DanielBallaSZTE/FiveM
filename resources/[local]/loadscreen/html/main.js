var count = 0;
var thisCount = 0;

const handler = {
    startInitFunctionOrder(data) {
        count = data.count
    },

    initFunctionInvoking(data) {
        document.querySelector('.progress-bar').style.left = '0%';
        document.querySelector('.progress-bar').style.width = ((data.idx / count) * 100) + "%"
    },
    startDataFileEntries(data) {
        count = data.count;
    },
    performMapLoadFunction(data) {
        ++thisCount;
        document.querySelector('.progress-bar').style.left = '0%';
        document.querySelector('.progress-bar').style.width = ((thisCount / count) * 100) + '%';
    }
}

window.addEventListener('message', (e) => {
    (handler[e.data.eventName] || function() {})(e.data)
});
