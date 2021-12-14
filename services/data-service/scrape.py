import requests
import bs4

url = "https://www.strava.com/clubs/841063/latest-rides/4e1d7bcb6e82dff8415fdaf3c1731e8a91b9b129?show_rides=true"

data = requests.get(url)

store = False
if (store):
    with open("index.html", "w") as f:
        f.write(data.text)

soup = bs4.BeautifulSoup(data.text, features="html.parser")

totalClubMembers = 5

activities = soup.find("ul")


thresholdForActive = 15

kmsContributed = {}


def addActivity(name, kmConributed):
    try:
        kmsContributed[name] += kmConributed
    except:
        kmsContributed[name] = kmConributed


for activity in activities:

    name = activity.find("p")

    if (name != -1):

        stats = activity.find("ul")

        kmLogged = float(stats.find("li").getText().split()[0])
        addActivity(name.text, kmLogged)

totalKms = 0
for member in kmsContributed:
    kms = kmsContributed[member]
    totalKms += min(kmsContributed[member] / thresholdForActive, 1)


print(round(totalKms / totalClubMembers * 100))
