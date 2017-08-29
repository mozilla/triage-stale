const noassignee = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2016-06-01&chfieldto=Now&email1=nobody%40mozilla.org&emailassigned_to1=1&emailtype1=exact&f1=delta_ts&f2=flagtypes.name&known_name=Orphaned%20P1s&o1=lessthan&o2=notsubstring&priority=P1&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=-2w&v2=needinfo%3F";

const inactive = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&chfield=%5BBug%20creation%5D&chfieldfrom=2016-06-01&chfieldto=Now&email1=nobody%40mozilla.org&emailassigned_to1=1&emailtype1=notequals&f1=delta_ts&f2=flagtypes.name&o1=lessthan&o2=notsubstring&priority=P1&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---&v1=-2w&v2=needinfo%3F";

const stalled = "https://bugzilla.mozilla.org/rest/bug?include_fields=id,summary,status&f1=delta_ts&f2=flagtypes.name&keywords=stale-bug%2C%20&keywords_type=allwords&o1=lessthan&o2=notsubstring&product=Core&product=Firefox&product=Firefox%20for%20Android&product=Firefox%20for%20iOS&product=Toolkit&resolution=---"


var currentCycle = 'Firefox 57';

var reports = [
    {title: "Orphaned P1s (No Assignee)",
     name: "noassignee",
     url: noassignee },
    {title: "Inactive P1s (No Change in 2W)",
     name: "inactive",
     url: inactive},
    {title: "Stalled Bugs",
     name: "stalled",
     url: stalled}
];

var first = true;

document.querySelector('body h3 span').insertAdjacentText('beforeend', currentCycle);

reports.forEach(report => {
    document.querySelector('body ul')
    .insertAdjacentHTML('beforeend', `<li class="${report.name}">${report.title}: <span></span></li>`); 

    fetch(report.url)
    .then(res => { return res.json() })
    .then(body => {
        document.querySelector('body ul li.' + report.name + ' span')
        .insertAdjacentText('beforeend', numeral(body.bugs.length).format('0,0'));
    });
})


