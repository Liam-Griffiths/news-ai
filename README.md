#News Aggregator

> Current Demo: https://liam-news-ai.netlify.app/

#### Project Intentions -

- Vision: **To create a news platform that reads the news and automatically aggregates the top and breaking stories and generates unique headlines.** Drudge Report is a long standing news aggregation website, that is still currently hand curated and edited by a Human. In the age of machine learning and cheap cloud computing, a solution could be created that finds, aggregates and breaks stories faster than any human.

- Current Build: Server is a Serverless Framework project being deployed to AWS. The current rough prototype injests a number of mainstream news RSS feeds, extracts headlines, then uses an NLP library to extract “topics” from the headlines. These headlines are then sorted by topic, then fed into a markov chain library to create“new" headlines. These are then place into a JSON file in s3 ready to be served to the UI. The UI is a simple react app, continously deployed to netlify.

- Problems with Current Build: 
	1. Messy, very rough code. 
	2. Overlapping Topics. Currently topics can collide creating confusing and often humourous mismatched headlines.
	3. Markov chain headlines arent smart, they are only as good as their inputs and cannot produce truly original headlines. 
	4. Inefficent. Currently collecting news every thirty minutes rather than being more responsive.

- Next Steps: 
	1. REFACTOR. Code needs to be cleaned up and broken out into a more reusable fashion.
	2. Better topic matching. Possibly begin reading the articles themselves to improve topic collection. 
	3. Begin training a SageMaker instance in headline selection and creation, with the goal of being more effective at headline creation than a Markov chain generated sentence. Something similar to a very narrowly focused gpt-3 nlp model. 
	4. Improve story selection, some stories overwhelm others despite being “yesterdays news", a points system for floating up newer and more breaking stories to the front page whilst bringing down older less relevant stories. 
	5. Unit testing and deployment infrastructure for the Serverless project. 
	6. Incorporate passive social media trends to determine breaking stories.

- Ultimate Goal: **Is to have an entirely AI driven new aggregator that can surface breaking news faster and better than any human aggregated news source.**
