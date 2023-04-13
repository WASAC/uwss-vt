const {postgis2mbtiles} = require('@watergis/postgis2mbtiles');
const config = require('./config');

const generate = async () =>{
    console.time('postgis2mbtiles');
    const pg2mbtiles = new postgis2mbtiles(config);
    const file_mbtile = await pg2mbtiles.run()
    console.log(`mbtiles was generated: ${file_mbtile}`);
    if (config.createPmtiles) {
        config.mbtiles = config.mbtiles.replace('.mbtiles', '.pmtiles')
        const pg2pmtiles = new postgis2mbtiles(config);
        const file_pmtile = await pg2pmtiles.run()
        console.log(`pmtiles was generated: ${file_pmtile}`);
    }
    console.timeEnd('postgis2mbtiles');
};

module.exports = generate();