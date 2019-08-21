# Slamaramazon
like amazon, except fake

the objective of this application was to test my ability to combine my newly-taught knowlede of MySQL and my current knowledge of the Inquirer package in node.js
![](https://github.com/NelsonCad/Slamaramazon/blob/master/images "")
### using the application
after downloding the dependencies ((npm install) to get all necessary dependencies for this application), run the application in the terminal with (node slamaramazon.js).

you will then be promted to which department you want to browse, choose any of them to browse the items in the department.

![image of storefront](https://github.com/NelsonCad/Slamaramazon/blob/master/images/applicationStart.PNG "Choose a Department!")

Then choose the item you want to buy and how many of them you want.

![Item choice image](https://github.com/NelsonCad/Slamaramazon/blob/master/images/blob/master/images/itemChoice.PNG "Choose an item from within that department")

![quantity decision](https://github.com/NelsonCad/Slamaramazon/blob/master/images/quantitySelect "How many do you want?")

if we do not have enough for your order, this message will appear, 

![not enough for your order image](https://github.com/NelsonCad/Slamaramazon/blob/master/images/failedPurchase.PNG "Sadly, we do not have enough for you")

after a successful or failed purchase, you will be asked if you want to make another purchase

![do you want to buy something else? image](https://github.com/NelsonCad/Slamaramazon/blob/master/images/successfulPurchase "thus looping backto the beginning, should you need to")