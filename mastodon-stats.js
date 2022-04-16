// Original Script: https://github.com/niklasmtj/simple-analytics-widget/blob/main/getSimpleAnalyticsStats.js

const api = await getPageStats()
const widget = await createWidget(api)

if (config.runsInWidget) {
  // The script runs inside a widget, so we pass our instance of ListWidget to be shown inside the widget on the Home Screen.
  Script.setWidget(widget)
} else {
  // When running the script inside the Scriptable app it will presented as a small widget
  widget.presentSmall()
}

Script.complete()

async function createWidget(api) {
  
  const widget = new ListWidget()
  widget.backgroundColor = Color.black()
  // Show app icon and title
  const titleStack = widget.addStack()
  titleStack.addSpacer(2)
  const titleElement = titleStack.addText(api.name)
  titleElement.textColor = Color.white()
  titleElement.textOpacity = 0.7
  titleElement.font = Font.mediumSystemFont(13)
  widget.addSpacer(6)
  
   // Show API Results
  const pageViewElementHeader = widget.addText("Active:")
  pageViewElementHeader.textColor = Color.white()
  pageViewElementHeader.font = Font.boldSystemFont(16)
  widget.addSpacer(2)
  const pageViewElementContent = widget.addText(api.logins.toString())
  pageViewElementContent.minimumScaleFactor = 0.5
  pageViewElementContent.textColor = Color.white()
  pageViewElementContent.font = Font.systemFont(16)
  widget.addSpacer(2)


  const visitorsElementHeader = widget.addText("New:")
  visitorsElementHeader.textColor = Color.white()
  visitorsElementHeader.font = Font.boldSystemFont(16)
  widget.addSpacer(2)
  const visitorsElementContent = widget.addText(api.registrations.toString())
  visitorsElementContent.minimumScaleFactor = 0.5
  visitorsElementContent.textColor = Color.white()
  visitorsElementContent.font = Font.systemFont(16)
  return widget
}

async function getPageStats() {
  const stats = await loadStats()
  
  const logins = stats[1].logins;
  const reg = stats[1].registrations;
  
  return {
    name: "Weekly Activity:",
    logins: logins,
    registrations: reg
  }
}

async function loadStats() {
  const url = "https://norden.social/api/v1/instance/activity"
  const req = new Request(url)

  return await req.loadJSON()
}
