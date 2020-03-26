import * as Knex from "knex";

export async function seed(knex: Knex): Promise<any> {
    await knex.raw(`DELETE FROM "schedule_item"`);
    await knex.raw(`DELETE FROM "attraction_tag"`);
    await knex.raw(`DELETE FROM "opening_hours"`);
    await knex.raw(`DELETE FROM "attraction"`);
    await knex.raw(`DELETE FROM "stay"`);
    await knex.raw(`DELETE FROM "trip"`);
    await knex.raw(`DELETE FROM "city"`);
    await knex.raw(`DELETE FROM "attraction_image"`);
    await knex.raw(`DELETE FROM "tag"`);
    await knex.raw(`DELETE FROM "user"`);

    const userResult = await knex.raw(`INSERT INTO "user" ("name","username","email","password") VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        "Lexie","lexingtonc852","lexingtonc852@gmail.com","1234",
        "Ravi","14225425","14225425@life.hkbu.edu.hk","1234",
        "Matthew","matthewchoi95","matthewchoi95@gmail.com","1234"
    ]);
    const lexieId = userResult.rows[0].id;
    const raviId = userResult.rows[1].id;
    const matthewId = userResult.rows[2].id;
    const tripResult = await knex.raw(`INSERT INTO "trip" ("user_id","name","start_date","end_date") VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        lexieId,"5 Day Trip","2020-04-01 09:00:00.00+08","2020-04-05 22:00:00.00+08",
        raviId,"3 Day Trip","2020-04-03 10:00:00.00+08","2020-04-05 21:00:00.00+08",
        matthewId,"7 Day Trip","2020-04-03 10:00:00.00+08","2020-04-09 22:00:00.00+08"
    ]);
    const lexieTrip = tripResult.rows[0].id;
    const raviTrip = tripResult.rows[1].id;
    const matthewTrip = tripResult.rows[2].id;
    await knex.raw(`INSERT INTO "stay" ("trip_id","name","location","start_time","end_time") VALUES
    (?,?,?,?,?),(?,?,?,?,?),(?,?,?,?,?)`,[
        lexieTrip,"Mandarin Oriental, Hong Kong","5 Connnaught Road, Central, Hong Kong","2020-04-01 15:00:00.00+08","2020-04-05 12:00:00.00+08",
        raviTrip,"W Hong Kong","1 Austin Road West, Kowloon Station, Tsim Sha Tsui, Hong Kong","2020-04-03 15:00:00.00+08","2020-04-05 12:00:00.00+08",
        matthewTrip,"Four Seasons Hotel Hong Kong","8 Finance Street, Hong Kong Central, Hong Kong","2020-04-03 15:00:00.00+08","2020-04-09 12:00:00.00+08"
    ]);

    const attractionImageResult = await knex.raw(`INSERT INTO "attraction_image"("url") VALUES
    (?),(?),(?),(?),(?) RETURNING id`,[
        "https://media.timeout.com/images/105442089/image.jpg",
        "https://mk0royalpark5y8ter7s.kinstacdn.com/wp-content/uploads/OCEAN-PARK_20190924.jpg",
        "https://timable.com/res/pic/5ee17a7fe3bf4ecf52d46f9e6ce9d5813.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/0c/5e/56/13/hong-kong-museum-of-history.jpg",
        "https://blogs.uml.edu/hongkong2013/wp-content/uploads/sites/5/2013/07/DSC01736-Copy.jpg"
    ]);
    const pmqImage = attractionImageResult.rows[0].id;
    const opImage = attractionImageResult.rows[1].id;
    const taiKwunImage = attractionImageResult.rows[2].id;
    const historyMuseumImage = attractionImageResult.rows[3].id;
    const ckTempleImage = attractionImageResult.rows[4].id;

    const cityResult = await knex.raw(`INSERT INTO "city" ("name") VALUES
    (?) RETURNING id`,["Hong Kong"]);
    const cityId = cityResult.rows[0].id;

    const pmqDes = "Formerly the Police Married Quarters, PMQ now houses works by promising young artists and designers in Hong Kong. Not only will you find a fascinating line-up of creative studios and designer products here, but there are also exhibitions and workshops all year round, giving you insights into the local creative scene. What’s more, this creative space doubles as an art canvas as well – be sure to check out the 20 flights of staircases here that have been decorated by groups of talented artists who were all inspired by tales of Hong Kong."
    const opDes = "Thrill rides, giant pandas and a world-class aquarium keep Ocean Park Hong Kong on travellers’ list of favourites."
    const taiKwunDes = "Located in the heart of Central on Hong Kong Island, Tai Kwun's site is bordered on three sides by Old Bailey Street, Hollywood Road and Arbuthnot Road, while Chancery Lane runs along the southern (upper) prison wall. Tai Kwun is situated in a vibrant and bustling part of the city, with easy access to other important heritage sites. Nestled between the skyscrapers of Central and Mid-Levels, Tai Kwun looks onto Hollywood Road, a busy street dotted with galleries, antique shops, restaurants and bars. The Central-Mid-Levels Escalator is connected to the compound by a new footbridge constructed at the intersection of Hollywood Road and Old Bailey Street in order to provide easier and more convenient access to the site."
    const historyMuseumDes = "The Hong Kong Museum of History is a museum which preserves Hong Kong's historical and cultural heritage. It is located next to the Hong Kong Science Museum, in Tsim Sha Tsui, Kowloon, Hong Kong. The collections of the museum encompass natural history, archaeology, ethnography and local history."
    const ckTempleDes = 'The temple was built in honour of "Che Kung" or "General Che", a great general of Song Dynasty(宋朝) . It was said that during an epidemic that broke out in Sha Tin in late Ming Dynasty, residents of Sha Tin found out from historical writings that Che Kung was not only merited for his successful suppression of uprisings, he was also known for clearing epidemics wherever he set foot in. People therefore built a temple to house Che Kung in Sha Tin. The epidemic subsided, so the story goes, on the day the construction of the temple was completed.'

    const attractionResult = await knex.raw(`INSERT INTO "attraction" ("attraction_image_id","city_id","name","description","location","telephone","url") VALUES
    (?,?,?,?,?,?,?),(?,?,?,?,?,?,?),(?,?,?,?,?,?,?),(?,?,?,?,?,?,?),(?,?,?,?,?,?,?) RETURNING id`,[
        pmqImage,cityId,"PMQ",pmqDes,"35 Aberdeen Street, Central","+852 2870-2335","https://www.pmq.org.hk/the-site/our-concept/",
        opImage,cityId,"Ocean Park",opDes,"Ocean Park, Aberdeen, Hong Kong","+852 3923-2323","https://www.oceanpark.com.hk/en",
        taiKwunImage,cityId,"Tai Kwun",taiKwunDes,"10 Hollywood Road, Central, Hong Kong","+852 3559-2600","https://www.taikwun.hk/en",
        historyMuseumImage,cityId,"Hong Kong Museum of History",historyMuseumDes,"100 Chatham Rd S, Tsim Sha Tsui","+852 2724-9042","https://hk.history.museum/en_US/web/mh/",
        ckTempleImage,cityId,"Sha Tin Che Kung Temple",ckTempleDes,"7 Che Kung Miu Rd, Sha Tin","+852 2603-4049","http://www.ctc.org.hk/en/directcontrol/temple21.asp"
    ]);
    const pmq = attractionResult.rows[0].id;
    const op = attractionResult.rows[1].id;
    const taiKwun = attractionResult.rows[2].id;
    const historyMuseum = attractionResult.rows[3].id;
    const ckTemple = attractionResult.rows[4].id;

    await knex.raw(`INSERT INTO "opening_hours" ("attraction_id","day_of_week","open_time","close_time")VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        pmq,0,"07:00:00","23:00:00",
        pmq,1,"07:00:00","23:00:00",
        pmq,2,"07:00:00","23:00:00",
        pmq,3,"07:00:00","23:00:00",
        pmq,4,"07:00:00","23:00:00",
        pmq,5,"07:00:00","23:00:00",
        pmq,6,"07:00:00","23:00:00"
    ]);
    
    await knex.raw(`INSERT INTO "opening_hours" ("attraction_id","day_of_week","open_time","close_time")VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        op,0,"10:00:00","18:00:00",
        op,1,"10:00:00","18:00:00",
        op,2,"10:00:00","18:00:00",
        op,3,"10:00:00","18:00:00",
        op,4,"10:00:00","18:00:00",
        op,5,"10:00:00","19:00:00",
        op,6,"10:00:00","19:00:00"
    ]);

    await knex.raw(`INSERT INTO "opening_hours" ("attraction_id","day_of_week","open_time","close_time")VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        taiKwun,0,"10:00:00","23:00:00",
        taiKwun,1,"10:00:00","23:00:00",
        taiKwun,2,"10:00:00","23:00:00",
        taiKwun,3,"10:00:00","23:00:00",
        taiKwun,4,"10:00:00","23:00:00",
        taiKwun,5,"10:00:00","23:00:00",
        taiKwun,6,"10:00:00","23:00:00"
    ]);

    await knex.raw(`INSERT INTO "opening_hours" ("attraction_id","day_of_week","open_time","close_time")VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        historyMuseum,0,"10:00:00","18:00:00",
        historyMuseum,2,"10:00:00","18:00:00",
        historyMuseum,3,"10:00:00","18:00:00",
        historyMuseum,4,"10:00:00","18:00:00",
        historyMuseum,5,"10:00:00","19:00:00",
        historyMuseum,6,"10:00:00","19:00:00"
    ]);

    await knex.raw(`INSERT INTO "opening_hours" ("attraction_id","day_of_week","open_time","close_time")VALUES
    (?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?),(?,?,?,?) RETURNING id`,[
        ckTemple,0,"08:00:00","18:00:00",
        ckTemple,1,"08:00:00","18:00:00",
        ckTemple,2,"08:00:00","18:00:00",
        ckTemple,3,"08:00:00","18:00:00",
        ckTemple,4,"08:00:00","18:00:00",
        ckTemple,5,"08:00:00","18:00:00",
        ckTemple,6,"08:00:00","18:00:00"
    ]);

    const tagResult = await knex.raw(`INSERT INTO "tag" ("name") VALUES
    (?),(?),(?),(?),(?) RETURNING id`,["Museum","Art & Culture","Historical Sites","Temple","Themed Park"])
    const museum = tagResult.rows[0].id;
    const artCulture = tagResult.rows[1].id;
    const historicalSites = tagResult.rows[2].id;
    const temple = tagResult.rows[3].id;
    const themedPark = tagResult.rows[4].id;

    await knex.raw(`INSERT INTO "attraction_tag" ("attraction_id","tag_id") VALUES
    (?,?),(?,?),(?,?),(?,?),(?,?) RETURNING id`,[
        pmq,artCulture,
        op,themedPark,
        taiKwun,historicalSites,
        historyMuseum,museum,
        ckTemple,temple
    ]);

    await knex.raw(`INSERT INTO "schedule_item" ("trip_id","attraction_id","name","description","start_time","end_time","location","type") VALUES
    (?,?,?,?,?,?,?,?),(?,?,?,?,?,?,?,?),(?,?,?,?,?,?,?,?),(?,?,?,?,?,?,?,?)`,[
        lexieTrip,taiKwun,null,null,"2020-04-01 12:00:00.00+08","2020-04-01 14:00:00.00+08",null,"attraction",
        lexieTrip,null,"Visiting Kelley","Meeting in her house","2020-04-01 15:00:00.00+08","2020-04-01 20:00:00.00+08","1 Braemar Hill Rd, North Point","custom",
        raviTrip,pmq,null,null,"2020-04-03 14:00:00.00+08","2020-04-03 15:00:00.00+08",null,"attraction",
        matthewTrip,ckTemple,null,null,"2020-04-03 13:00:00.00+08","2020-04-03 14:00:00.00+08",null,"attraction"
    ])
}