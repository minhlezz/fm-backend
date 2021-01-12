const { filter } = require("lodash");


module.exports = {

    Query: {
        homeFilters: async (_, { filtersInput }, { HouseHold }) => {
            const {
                buildingType,
                area,
                budget,
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
            if (area) {
                query.area = area;
            };
            if (budget) {
                query.budget = budget;
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

            const filterList = await HouseHold.find(query);
            return filterList
        },


        /**Exactly, userFilters() is search query containing string input */
        searchQuery: async (_, { filter }, { User }) => {
            const where = filter?
            {
                email: { $regex: filter, $options: 'i' }
            } : {};
            const listFilter = await User.find(where);
            return listFilter;
        }
    },


}


