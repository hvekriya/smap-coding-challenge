## The Frontend Challenge
#### Setup
The frontend challenge is located in the project folder `frontend`. To be able to use APIs you have to setup the dev environment:
* Create the dev python3 environment with `virtualenv -p python3 venv`.
* Activate environment: `source venv/bin/activate`.
* Install requirements: `pip install -r requirements.txt`.

After setup, please move to frontend/app folder (`cd frontend app`) and install vue webpack dev environment with `npm install` then run `npm run build` to generate a dist folder with all the assets. Then move one folder back with `cd ..`and run web server with `python manage.py runserver`.

If you visit the browser at `http://localhost:8000` you will have to see completed challenge results.

For the purpose of challenge, we prepared several apis you should use:
* `api/consumers` will return the list of all consumers;
* `api/consumers/<low|high|extra_high>` will return consumers of certain type (low voltage, high voltage, extra high voltage);
* `api/consumer/<consumer_id>` will return a particular consumer (GET) or delete (DELETE) a consumer;
* a POST request with params `name` and `consumer_type` to  `api/consumer` will create a new consumer;
* `api/monthly_statistics/<consumer_id>` will return a monthly statistics of a particular consumer with consumption, total_bill and total_cost data points. If you specify year param as: `api/monthly_statistics/<consumer_id>?year=2017` the api returns filtered results by year. The data contains 2016 and 2017. 

#### Objectives
The basic template files are in `frontend/app/templates/`. There is a `base.html` file which serves as a base template and `index.html` file, which is served as an index file. You can put static files in `frontend/app/static` folder. 
We prepared two static files for you:
* `frontend/app/static/css/style.css` for custom css and
* `frontend/app/statics/js/app.js` for custom js.
This files are already included in `base.html**. You can use them or include other files. If you free to use any other frontend technology and document it in REPORT.

**TASKS**
* Include CSS framework or create your own stylesheet. We would love to see some unique design touches.
* Create a reusable Vue component for displaying a list of consumers and filtering by consumer types. There should be options of deleting and adding consumers.
* Create a reusable Vue component for displaying a particular consumer, which includes a chart of Monthly Statistics data (consumption, total bill, total cost and calculated profit per month). This component should also implement filtering of the consumer data by year. There should be also total profit for a particular year or both years together (based on selection).
*  We are happy to see JS bundlers such as webpack or browserify, single file Vue components and CSS pre-processing.
* The site should be cross browser compatible and mobile ready. You can use any css framework you want.
* BONUS: frontend tests.
