require('dotenv').config();

module.exports = {
    db: {
      user:process.env.db_user,
      password:process.env.db_password,
      host:process.env.db_host,
      port:process.env.db_port,
      database:process.env.db_name,
    },
    name: 'WASAC Vector tiles',
    description: 'Vector tiles for water data in WASAC, Rwanda',
    attribution: '©Water and Sanitation Corporation, Ltd.',
    mbtiles: __dirname + '/data/uwss.mbtiles',
    ghpages: __dirname + '/public/tiles',
    createPmtiles: true,
    minzoom: 9,
    maxzoom: 14,
    layers : [
        {
            name: 'Kigali_Pipeline',
            geojsonFileName: __dirname + '/Kigali_Pipeline.geojson',
            select: `
            SELECT row_to_json(featurecollection) AS json FROM (
              SELECT
              'FeatureCollection' AS type,
              array_to_json(array_agg(feature)) AS features
              FROM (
              SELECT
                'Feature' AS type,
                ST_AsGeoJSON(ST_MakeValid(x.geom))::json AS geometry,
                row_to_json((
                SELECT t FROM (
                  SELECT
                  14 as maxzoom,
                  9 as minzoom,
                  'pipeline' as layer
                ) AS t
                )) AS tippecanoe,
                row_to_json((
                SELECT p FROM (
                  SELECT
                  "OBJECTID" as id, 
                  "From_name_To_name", 
                  "Branch_Name", 
                  "Diameter", 
                  "Connected_to", 
                  "Pipeline_Material", 
                  "Pipeline_Category", 
                  "Nominal_Pressure", 
                  "Depth", 
                  "Roughness", 
                  "Thickness_mm", 
                  "Action_on_pipeline", 
                  "Year_of_Laying", 
                  "Company_that_layed_the_pipe", 
                  "Street_Number", 
                  "Provide_comment_if_necessary"
                ) AS p
                )) AS properties
              FROM uwss_assets."Kigali_Pipeline" x
              WHERE NOT ST_IsEmpty(x.geom)
              ) AS feature
            ) AS featurecollection
            `
        },
        {
          name: 'Upcountry_Pipeline',
          geojsonFileName: __dirname + '/Upcountry_Pipeline.geojson',
          select: `
          SELECT row_to_json(featurecollection) AS json FROM (
            SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
            FROM (
            SELECT
              'Feature' AS type,
              ST_AsGeoJSON(ST_MakeValid(x.geom))::json AS geometry,
              row_to_json((
              SELECT t FROM (
                SELECT
                14 as maxzoom,
                9 as minzoom,
                'pipeline' as layer
              ) AS t
              )) AS tippecanoe,
              row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "From_name_To_name", 
                "Branch_Name", 
                "Diameter", 
                "Connected_to", 
                "Pipeline_Material", 
                "Pipeline_Category", 
                "Nominal_Pressure", 
                "Depth", 
                "Roughness", 
                "Thickness_mm", 
                "Action_on_pipeline", 
                "Year_of_Laying", 
                "Company_that_layed_the_pipe", 
                "Street_Number", 
                "Provide_comment_if_necessary"
              ) AS p
              )) AS properties
            FROM uwss_assets."Upcountry_Pipeline" x
            WHERE NOT ST_IsEmpty(x.geom)
            ) AS feature
          ) AS featurecollection
          `
      },
      {
        name: 'Kigali_Customers_all',
        geojsonFileName: __dirname + '/Kigali_Customers_all.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  14 as minzoom,
                  'customers' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                x."OBJECTID" as id, 
                x."Data_Collection_Date", 
                x."Point_of_Connection_POC", 
                x."UPI", 
                x."Branch_Name", 
                x."CFO_Code", 
                x."Meter_Type", 
                x."Type_writer_Reading", 
                x."Water_Meter_Manufacturer", 
                x."Serial_Number", 
                x."Old_serial_number", 
                x."Meter_Nominal_Flow_Rate", 
                x."Metrological_Class", 
                x."Year_of_Manufacture", 
                x."Inlet_Pipe_Connection_Diameter", 
                x."Is_the_plot_accessible", 
                x."Type_of_customer", 
                x."Is_it_a_particular_customer_or_", 
                x."How_many_water_users", 
                x."Is_there_WASAC_water", 
                x."Is_there_REGI_water", 
                x."Is_water_meter_available", 
                x."If_No_Provide_Connection_Legali", 
                x."Presence_of_water_meter_box", 
                x."Physical_Status_of_Meter", 
                x."Meter_sealing", 
                x."Screen_Status", 
                x."Index_Status", 
                x."Current_Index_Reading", 
                x."Connection_Model", 
                x."Connection_Legality", 
                x."Presence_of_Water_Tank", 
                x."Tank_capacity_in_liters", 
                x."Tank_Material", 
                x."Tank_Position", 
                x."Other_Water_Storage_Capacity_in", 
                x."Presence_of_swimming_Pool",  
                x."DMA"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Customers_all" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Customers',
        geojsonFileName: __dirname + '/Upcountry_Customers.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  14 as minzoom,
                  'customers' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                x."OBJECTID" as id, 
                x."Data_Collection_Date", 
                x."Point_of_Connection_POC", 
                x."UPI", 
                x."Branch_Name", 
                x."CFO_Code", 
                x."Meter_Type", 
                x."Type_writer_Reading", 
                x."Water_Meter_Manufacturer", 
                x."Serial_Number", 
                x."Old_serial_number", 
                x."Meter_Nominal_Flow_Rate", 
                x."Metrological_Class", 
                x."Year_of_Manufacture", 
                x."Inlet_Pipe_Connection_Diameter", 
                x."Is_the_plot_accessible", 
                x."Type_of_customer", 
                x."Is_it_a_particular_customer_or_", 
                x."How_many_water_users", 
                x."Is_there_WASAC_water", 
                x."Is_there_REGI_water", 
                x."Is_water_meter_available", 
                x."If_No_Provide_Connection_Legali", 
                x."Presence_of_water_meter_box", 
                x."Physical_Status_of_Meter", 
                x."Meter_sealing", 
                x."Screen_Status", 
                x."Index_Status", 
                x."Current_Index_Reading", 
                x."Connection_Model", 
                x."Connection_Legality", 
                x."Presence_of_Water_Tank", 
                x."Tank_capacity_in_liters", 
                x."Tank_Material", 
                x."Tank_Position", 
                x."Other_Water_Storage_Capacity_in", 
                x."Presence_of_swimming_Pool",  
                x."DMA"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Customers" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Manhole',
        geojsonFileName: __dirname + '/Kigali_Manhole.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  11 as minzoom,
                  'manhole' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Location_Name", 
                "Branch_Name", 
                "Materials", 
                "Covered", 
                "Cover_type", 
                "Content_1", 
                "Content_2", 
                "Content_3", 
                "Content_4", 
                "Content_5", 
                "Year_of_Construction", 
                "Size", 
                "Provide_comment_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Manhole" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Manhole',
        geojsonFileName: __dirname + '/Upcountry_Manhole.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'manhole' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Location_Name", 
                "Branch_Name", 
                "Materials", 
                "Covered", 
                "Cover_type", 
                "Content_1", 
                "Content_2", 
                "Content_3", 
                "Content_4", 
                "Content_5", 
                "Year_of_Construction", 
                "Size", 
                "Provide_comment_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Manhole" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Water_Source',
        geojsonFileName: __dirname + '/Kigali_Water_Source.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'water_source' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Discharge_m3_h", 
                "Location_Name", 
                "Branch_Name", 
                "Water_source_type", 
                "Source_capacity", 
                "Is_there_chlorination_unit", 
                "Is_there_water_meter_", 
                "Provide_comments_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Water_Source" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Water_Source',
        geojsonFileName: __dirname + '/Upcountry_Water_Source.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'water_source' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Discharge_m3_h", 
                "Location_Name", 
                "Branch_Name", 
                "Water_source_type", 
                "Source_capacity", 
                "Is_there_chlorination_unit", 
                "Is_there_water_meter_", 
                "Provide_comments_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Water_Source" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Reservoir',
        geojsonFileName: __dirname + '/Kigali_Reservoir.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'reservoir' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_code", 
                "Location_Name", 
                "Branch_Name", 
                "Capacity_m3", 
                "Diameter", 
                "Material", 
                "Is_there_Water_Meter", 
                "Reservoir_Form", 
                "Base_Elevation", 
                "Height_m", 
                "Type_of_the_inlet_pipe", 
                "Elevation_of_the_inlet_pipe_in_", 
                "Initial_Level", 
                "Minimum_Level", 
                "Maximum_Level", 
                "Minimum_Volume", 
                "Presence_of_float_valve_Regulat",
                "Diameter_of_inlet_pipe_for_the_", 
                "Reservoir_Position", 
                "Reservoir_Function", 
                "Construction_Year", 
                "Provide_comment_if_necessary", 
                "Altitude",
                "Reservoir_Status"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Reservoir" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Reservoir',
        geojsonFileName: __dirname + '/Upcountry_Reservoir.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'reservoir' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_code", 
                "Location_Name", 
                "Branch_Name", 
                "Capacity_m3", 
                "Diameter", 
                "Material", 
                "Is_there_Water_Meter", 
                "Reservoir_Form", 
                "Base_Elevation", 
                "Height_m", 
                "Type_of_the_inlet_pipe", 
                "Elevation_of_the_inlet_pipe_in_", 
                "Initial_Level", 
                "Minimum_Level", 
                "Maximum_Level", 
                "Minimum_Volume", 
                "Presence_of_float_valve_Regulat",
                "Diameter_of_inlet_pipe_for_the_", 
                "Reservoir_Position", 
                "Reservoir_Function", 
                "Construction_Year", 
                "Provide_comment_if_necessary", 
                "Altitude",
                "Reservoir_Status"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Reservoir" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Pump',
        geojsonFileName: __dirname + '/Kigali_Pump.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'pump' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "Created_Date", 
                "ID_Code", 
                "Location_Name", 
                "Branch_Name", 
                "Power_source", 
                "Nature", 
                "Electrical_Starting_Method", 
                "Head_m", "Current_Head_m", 
                "Flow_rate_m3_h", 
                "Current_Flow_rate_m3_h", 
                "Year_of_Construction", 
                "Year_of_installation", 
                "Installation", 
                "Type_Number", 
                "Motor_Mark", 
                "Motor_Type", 
                "Voltage_Frequency", 
                "Power_Consumption_KW", 
                "Power_KW", 
                "Constant_Operating", 
                "Time_Controlled", 
                "Time_Start",
                 "Time_Stop", 
                 "Level_Controlled", 
                 "Start_Level", 
                 "Stop_Level", 
                 "Controlled_Junction_Tank_ID", 
                 "Characteristic_Curve", 
                 "Provide_Comment_if_necessary", 
                 "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Pump" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Pump',
        geojsonFileName: __dirname + '/Upcountry_Pump.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'pump' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "Created_Date", 
                "ID_Code", 
                "Location_Name", 
                "Branch_Name", 
                "Power_source", 
                "Nature", 
                "Electrical_Starting_Method", 
                "Head_m", "Current_Head_m", 
                "Flow_rate_m3_h", 
                "Current_Flow_rate_m3_h", 
                "Year_of_Construction", 
                "Year_of_installation", 
                "Installation", 
                "Type_Number", 
                "Motor_Mark", 
                "Motor_Type", 
                "Voltage_Frequency", 
                "Power_Consumption_KW", 
                "Power_KW", 
                "Constant_Operating", 
                "Time_Controlled", 
                "Time_Start",
                 "Time_Stop", 
                 "Level_Controlled", 
                 "Start_Level", 
                 "Stop_Level", 
                 "Controlled_Junction_Tank_ID", 
                 "Characteristic_Curve", 
                 "Provide_Comment_if_necessary", 
                 "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Pump" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Treatment_Plant',
        geojsonFileName: __dirname + '/Kigali_Treatment_Plant.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  9 as minzoom,
                  'water_treatment_plant' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Location_Name", 
                "Branch_Name", 
                "Treatment_Plant_Name", 
                "Raw_Water_Nature", 
                "Location_Name_of_Raw_Water", 
                "Designed_Production_Capacity_in", 
                "WTP_Type", 
                "Treated_Water_Reservoir_Capacit", 
                "Year_of_Construction", 
                "Provide_comments_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Treatment_Plant" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Treatment_Plant',
        geojsonFileName: __dirname + '/Upcountry_Treatment_Plant.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  9 as minzoom,
                  'water_treatment_plant' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Location_Name", 
                "Branch_Name", 
                "Treatment_Plant_Name", 
                "Raw_Water_Nature", 
                "Location_Name_of_Raw_Water", 
                "Designed_Production_Capacity_in", 
                "WTP_Type", 
                "Treated_Water_Reservoir_Capacit", 
                "Year_of_Construction", 
                "Provide_comments_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Treatment_Plant" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Valve',
        geojsonFileName: __dirname + '/Kigali_Valve.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'valve' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_code",
                "From_Node", 
                "To_Node", 
                "Location_Name", 
                "Branch_Name", 
                "Diameter", 
                "Material", 
                "Valve_Function", 
                "Operating_System", 
                "Valve_Status", 
                "Valve_Type", 
                "Opening_direction", 
                "Pressure", 
                "Provide_Comment_if_necessary", 
                "Altitude", 
                "Valve_Situation"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Valve" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Valve',
        geojsonFileName: __dirname + '/Upcountry_Valve.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'valve' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_code",
                "From_Node", 
                "To_Node", 
                "Location_Name", 
                "Branch_Name", 
                "Diameter", 
                "Material", 
                "Valve_Function", 
                "Operating_System", 
                "Valve_Status", 
                "Valve_Type", 
                "Opening_direction", 
                "Pressure", 
                "Provide_Comment_if_necessary", 
                "Altitude", 
                "Valve_Situation"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Valve" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Fire_Hydrant',
        geojsonFileName: __dirname + '/Upcountry_Fire_Hydrant.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'fire_hydrant' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Location", 
                "Branch_Name", 
                "Owner_Type", 
                "Installation_Type", 
                "Hose_Coupling_Standard", 
                "Presence_of_Meter", 
                "Inlet_Diameter", 
                "Outlet_Diameter", 
                "Provide_comment_if_necessary", 
                "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Fire_Hydrant" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Kigali_Water_Meter',
        geojsonFileName: __dirname + '/Kigali_Water_Meter.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'water_meter' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Meter_Location_Name", 
                "Branch_Name", 
                "Serial_Number", 
                "Old_serial_number", 
                "Meter_Manufacturer",
                "Year_of_Manufacture",
                "Meter_Type", 
                "Meter_Class", 
                "Nominal_Flow", 
                "Meter_Function", 
                "Type_writer_Reading", 
                "Physical_Status_of_Meter",
                 "Meter_sealing", 
                 "Meter_screen_status", 
                 "Meter_Position", 
                 "Meter_Index_Status", 
                 "Meter_Current_Index_Reading", 
                 "Inlet_Pipe_Connection_Diameter", 
                 "DMA_Code", 
                 "Provide_comments_if_necessary", 
                 "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Kigali_Water_Meter" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
      {
        name: 'Upcountry_Water_Meter',
        geojsonFileName: __dirname + '/Upcountry_Water_Meter.geojson',
        select:`
        SELECT row_to_json(featurecollection) AS json FROM (
          SELECT
            'FeatureCollection' AS type,
            array_to_json(array_agg(feature)) AS features
          FROM (
            SELECT
            'Feature' AS type,
            ST_AsGeoJSON(x.geom)::json AS geometry,
            row_to_json((
              SELECT t FROM (
                SELECT
                  14 as maxzoom,
                  12 as minzoom,
                  'water_meter' as layer
              ) AS t
            )) AS tippecanoe,
            row_to_json((
              SELECT p FROM (
                SELECT
                "OBJECTID" as id, 
                "ID_Code", 
                "Meter_Location_Name", 
                "Branch_Name", 
                "Serial_Number", 
                "Old_serial_number", 
                "Meter_Manufacturer",
                "Year_of_Manufacture",
                "Meter_Type", 
                "Meter_Class", 
                "Nominal_Flow", 
                "Meter_Function", 
                "Type_writer_Reading", 
                "Physical_Status_of_Meter",
                 "Meter_sealing", 
                 "Meter_screen_status", 
                 "Meter_Position", 
                 "Meter_Index_Status", 
                 "Meter_Current_Index_Reading", 
                 "Inlet_Pipe_Connection_Diameter", 
                 "DMA_Code", 
                 "Provide_comments_if_necessary", 
                 "Altitude"
              ) AS p
            )) AS properties
            FROM uwss_assets."Upcountry_Water_Meter" x
            WHERE NOT ST_IsEmpty(x.geom)
          ) AS feature
        ) AS featurecollection
        `
      },
    ],
};
