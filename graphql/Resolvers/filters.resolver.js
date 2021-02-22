const { filter } = require("lodash");


module.exports = {

    Query: {
        homeFilters: async (_, { filtersInput }, { HouseHold }) => {
            const {
                buildingType,
                areaLTE,
                areaGTE,
                budgetLTE,
                budgetGTE,
                bath,
                bed,
                houseHoldSex,
                airConditioning,
                internet,
                parking,
                privateBathroom,
                yard } = filtersInput;

            var query = {};

            if (buildingType) {
                query.buildingType = buildingType;
            };
            if (areaGTE !== undefined && areaLTE !== undefined) {
                query.area = { $gte: `${areaGTE}`, $lte: `${areaLTE}` }

            };
            if (budgetGTE !== undefined && budgetLTE !== undefined) {
                query.budget = { $gte: `${budgetGTE}`, $lte: `${budgetLTE}` }

            };
            if (bath) {
                query.bath = bath;
            };
            if (bed) {
                query.bed = bed;
            };
            if (houseHoldSex) {
                query.houseHoldSex = houseHoldSex;
            };
            if (airConditioning) {
                query.airConditioning = airConditioning;
            };
            if (internet) {
                query.internet = internet;
            };
            if (privateBathroom) {
                query.privateBathroom = privateBathroom;
            };
            if (parking) {
                query.parking = parking;
            };
            if (yard) {
                query.yard = yard;
            };
            console.log(query);
            const filterList = await HouseHold.find(query);
            return filterList
        },


        /**Exactly, userFilters() is search query containing string input */
        searchQuery: async (_, { filter }, { User }) => {
            const where = filter ?
                {
                    email: { $regex: filter, $options: 'i' }
                } : {};
            const listFilter = await User.find(where);
            return listFilter;
        }
    },


}


