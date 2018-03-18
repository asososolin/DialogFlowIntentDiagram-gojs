var intents = [{
        "id": "074bacf7-49e7-47d1-b949-567890dad6a5",
        "name": "dinner - what",
        "contextIn": [],
        "events": [{
            "name": "dinner-what"
        }],
        "parameters": [],
        "contextOut": [{
            "name": "dinner-what-followup",
            "parameters": {},
            "lifespan": 2
        }],
        "actions": [
            "dinner-what"
        ],
        "priority": 500000,
        "fallbackIntent": false
    },
    {
        "id": "12342631-7762-41b3-ad90-c2eac72a471f",
        "name": "dinner - what - reply",
        "contextIn": [
            "dinner-what-followup"
        ],
        "events": [],
        "parameters": [{
            "id": "15a3c899-76c9-414a-9ea2-633c791f5581",
            "required": false,
            "dataType": "@dinner",
            "name": "dinner",
            "value": "$number",
            "isList": false
        }],
        "contextOut": [],
        "actions": [
            "dinner-what-reply"
        ],
        "priority": 500000,
        "fallbackIntent": false
    }
]

export default intents;