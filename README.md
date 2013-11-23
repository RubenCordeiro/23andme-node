23andme-node
===

# Index

* [Installation](#installation)
* [Usage](#usage)
* [Documentation](#documentation)
* [TODO](#todo)

# Installation

`npm install 23andme-node`

# Usage

```javascript
var g23 = require('23andme-node');

g23.getProfiles({token: 'fdab6a6892b198e40c2484bf2121f761'}, function (err, data) {
  console.log(utils.inspect(err || data, false, null));
});
```

# Documentation

All methods return a callback with the signature `callback(error, data)`.

`data` and `error` are JavaScript objects.

All methods expect a `params` object with at least the user's authentication `token`.

All methods for the same resource return the same `data` object regardless of HTTP verb.

Official API [documentation](https://api.23andme.com/docs/reference/).

## getProfiles(params, callback(error, data))

### params

* None!

### data

```javascript 
{
    first_name: "Gregor",
    last_name: "Mendel",
    id: "a42e94634e3f7683",
    profiles: [
        {
            first_name: "Johann",
            last_name: "Mendel",
            id: c4480ba411939067
        }, ...
    ]
}
```

## getProfileNames(params, callback(error, data))

### params
 
* `profileId` - Optional. Filters names to just one profile.

### data

```javascript
{
    id: "c4480ba411939067",
    url_size_40_40: "https://...cfff05bbb_T.0_0_299_299.jpg",
    url_size_60_60: "https://...cfff05bbb_S.0_0_299_299.jpg",
    url_size_200_200: "https://...ff05bbb_M.0_0_299_299.jpg"
}
```

## getProfilePictures(params, callback(error, data))

### params

* `profileId`

### data

```javascript
{
    id: "c4480ba411939067",
    url_size_40_40: "https://...cfff05bbb_T.0_0_299_299.jpg",
    url_size_60_60: "https://...cfff05bbb_S.0_0_299_299.jpg",
    url_size_200_200: "https://...ff05bbb_M.0_0_299_299.jpg"
}
```

## getPublished(params, callback(error, data))

### params

* `profileId`
* `featureId` - Values are `'music'`, `'neanderthal'`, `'maternal'`, `'paternal'`, `'composition'`
* `linkId` - Optional. Filters results to just one link.

### data

```javascript
{
    id: "c4480ba411939067",
    url: "https://www.23andme.com/published/.../",
    link_id: "925v3n92424g4",
    feature_id: "neanderthal",
    status: "unpublished"
}
```

## getIntroduction(params, callback(error, data))

### params


* `profileId`
* `matchId`

### data

```javascript
{
    introduction: {
      status: "received",
      visibility: "genome",
      message_text: "Hi! Want to explore?"
    },
    can_send: false
}
```

## getGenotypes(params, callback(error, data))

### params


* `profileId`
* `locations` - An array of SNP strings. 
* `unfiltered` - Optional. Possible values are `true` or `false`

### data

```javascript
{
    i3000001: "II",
    rs3094315: "AA"
    id: "c4480ba411939067"
}
```

## getGenomes(params, callback(error, data))

### params

* `profileID`
* `unfiltered` - Optional. Possible values are `true` or `false`

### data

```javascript
{
    id: "c4480ba411939067",
    genome: "ACTAGTAG__TTGADDAAIICCTT" // ... (2MB string!)
}
```

## getHaplogroups(params, callback(error, data))

### params

* `profileId`

### data

```javascript
{
    maternal_terminal_snps: [
        {
            rsid: "i3001424",
            rcrs_position: "15874"
        },
        {
            rsid: "i5050411",
            rcrs_position: "15874"
        }
    ],
    paternal_terminal_snps: [
        {
            "rsid": "i3000015",
            "snp": "M125"
        }
    ],
    maternal: "D4e2",
    paternal: "D2a1",
    id: "c4480ba411939067"
}
```
## getAncestry(params, callback(error, data))

### params

* `profileId` 
* `threshold` - A number in the interval (0.5, 1.0) exclusive. Default is 0.75.

### data

```javascript
{
    id: "7ad467ea509080fb"
    ancestry: {
        label: "Total",
        proportion: 1.0,
        unassigned: 0.0,
        sub_populations: [
            {
                label: "Sub-Saharan African",
                proportion: 0.8227
            },
            {
                label: "European"
                proportion: 0.1773,
                unassigned: 0.0193,
                sub_populations: [
                    {
                        label: "Northern European",
                        proportion: 0.1579,
                        unassigned: 0.0725,
                        sub_populations: [
                            {
                                label: "French and German",
                                proportion: 0.0676
                            }, ...
                        ],
                    }, ...
                ]
            }, ...
        ]
    }
}
```

## getNeanderthal(params, callback(error, data))

### params

* `profileId` 

### data

```javascript
{
    id: "7ad467ea509080fb"
    neanderthal: {
        proportion: 0.0310,
    }
}
```

## getRelatives(params, callback(error, data))

### params

* `profileId`
* `filters` - An object with properties `limit`, `offset`, `since`, `share_status`, `intro_status`.

`share_status` can have the following values: `'Owned Profile'`, `'Sharing Genomes'`, `'Public Match'`

`intro_status` can have the following values: `'Introduction Sent'`, `'Introduction Received'`, `'Introduction Accepted'`, `'Introduction Declined'`, `'Introduction Cancelled'`

### data

```javacsript
{
    id: "18974891hh1f3h",
    count: 10,
    relatives: [
        {
            match_id: "48f2489h294hf",
            first_name: "Aodh",
            last_name: "O'Donnell",
            sex: "Male",
            birth_year: 1977,
            birthplace: "United States",
            ancestry: "Northern Europe",
            family_locations: [
                "Arlington, VA",
                "County Louth, Ireland"
            ],
            family_surnames: [
                "Lindell",
                "Dillingham",
                "Kelly"
            ],
            shared_segments: 23,
            relationship: "3rd Cousin",
            predicted_relationship_code: 32,
            user_relationship_code: null,
            range: ["3rd Cousin", "6th Cousin"],
            similarity: 0.24,
            maternal_haplogroup: "K1b1a1",
            paternal_haplogroup: "G2a5",
            maternal_side: false,
            paternal_side: true,
            notes: "we have the same familiar surnames",
            added: 1348699925,
            updated: 1348699975,
            residence: "North Carolina",
            intro_status: "Introduction Accepted",
            share_status: "Sharing Genomes",
            profile_picture_urls: {
                url_size_40_40: "https://...cfff05bbb_T.0_0_299_299.jpg",
                ...
            }
        }, ...
    ]
}
```

## getRisks(params, callback(error, data))

### params

* `profileId`

### data

```javascript
{
    id: "c4480ba411939067",
    risks: [
        {
            description: "Atrial Fibrillation",
            report_id: "atrialfib",
            population_risk: 0.2715,
            risk: 0.4164
        },
        {
            description: "Prostate Cancer",
            report_id: "prostate",
            population_risk: 0.1783,
            risk: 0.2585
        }, ...
    ]
}
```

## getCarriers(params, callback(error, data))

### params

* `profileId`

### data

```javascript
{
    id: "c4480ba411939067",
    drug_responses: [
        {
            description: "Alcohol Consumption, Smoking and Risk of Esophageal Cancer",
            report_id: "alcohol_esophageal_pgx",
            status: "typical"
        },
        {
            description: "Response to Hepatitis C Treatment",
            report_id: "hepc_peginf_ribavirin",
            status: "reduced"
        }, ...
    ]
}
```

## getTraits(params, callback(error, data))

### params

* `profileId`

### data

```javascript
{
    i"d: "c4480ba411939067",
    traits: [
        {
            description: "Muscle Performance",
            report_id: "muscleperformance",
            possible_traits: [
                "Likely Sprinter",
                "Unlikely Sprinter"
            ],
            trait: "Unlikely Sprinter"
        },
        {
            description: "Resistance to HIV/AIDS",
            report_id: "hiv",
            possible_traits: [
                "Not Resistant",
                "Partially Resistant"
            ],
            trait: "Not Resistant"
        }, ...
    ],
}
```

## postProfilePicture(params, callback(error, data))

Not yet implemented.

## postPublish(params, callback(error, data))

### params

* `profileId`
* `featureId` - Values are `'music'`, `'neanderthal'`, `'maternal'`, `'paternal'`, `'composition'`

## putPublish(params, callback(error, data))

### params

* `profileId`
* `featureId` - Values are `'music'`, `'neanderthal'`, `'maternal'`, `'paternal'`, `'composition'`
* `linkId`
* `status` - Values are `'published'` or `'unpublished'`

## patchIntroduction(params, callback(error, data))

### params

* `profileId`
* `matchId`
* `status` - Possible values are `'accepted'`, `'rejected'`, `'read'`, `'cancelled'`.
* `visibility` - Possible values are `'anonymous'`, `'profile'`, `'genome'`

At least one of `status` and `visibility` has to be provided as parameters.

## patchRelatives(params, callback(error, data)) 

### params

* `profileId`
* `matchId`
* `notes` - A string.
* `relationshipCode`

Possible values for `relationshipCode`:

`0` You

`1` Identical Twin

`2` Father

`3` Mother

`4` Son

`5` Daughter

`6` Brother

`7` Sister

`8` Half Brother

`9` Half Sister

`10` Grandfather

`11` Grandmother

`12` Grandson

`13` Granddaughter

`14` Uncle

`15` Aunt

`16` Nephew

`17` Niece

`18` Great Grandfather

`19` Great Grandson

`20` Great Grandmother

`21` Great Granddaughter

`22` Great Uncle

`23` Great Aunt

`24` Great Nephew

`25` Great Niece

`26` 1st Cousin

`27` 1st Cousin, Once Removed

`28` 1st Cousin, Twice Removed

`29` 2nd Cousin

`30` 2nd Cousin, Once Removed

`31` 2nd Cousin, Twice Removed

`32` 3rd Cousin

`33` 3rd Cousin, Once Removed

`34` 3rd Cousin, Twice Removed

`35` 4th Cousin

`38` 5th Cousin

`41` 6th Cousin

`44` Distant Cousin

# TODO

* Implement postProfilePictures.