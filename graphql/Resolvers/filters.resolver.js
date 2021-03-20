
module.exports = {

    Query: {
        /**Homes filter by properties */
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

        /**User filter by properties */
        userFilters: async (_, { userFilterInput }, { User }) => {
            var userQuery = {};
            const {
                ageGTE,
                ageLTE,
                budgetGTE,
                budgetLTE,
                gender,
                cleanliness,
                overnightGuests,
                partyHabits,
                getUp,
                goToBed,
                foodReference,
                smoker,
                workSchedule,
                occupation,
                pet,
            } = userFilterInput;
            /**Age Property */
            if (ageGTE !== undefined && ageLTE !== undefined) {
                userQuery.age = { $gte: `${ageGTE}`, $lte: `${ageLTE}` }

            };
            /**Budget Property */
            if (budgetGTE !== undefined && budgetLTE !== undefined) {
                userQuery.budget = { $gte: `${budgetGTE}`, $lte: `${budgetLTE}` }
            };
            /**Gender Property */
            if (gender === 'Male' || gender === 'Female') {
                userQuery.gender = gender;
            }
            /**cleanliness Property */
            if (cleanliness) {
                userQuery.cleanliness = cleanliness;
            };
            /**overnightGuests Property */
            if (overnightGuests) {
                userQuery.overnightGuests = overnightGuests;
            };
            /**partyHabits Property */
            if (partyHabits) {
                userQuery.partyHabits = partyHabits;
            };
            /**getUp Property */
            if (getUp) {
                userQuery.getUp = getUp;
            };
            /**goToBed Property */
            if (goToBed) {
                userQuery.goToBed = goToBed;
            };
            /**foodReference Property */
            if (foodReference) {
                userQuery.foodReference = foodReference;
            };
            /**smoker Property */
            if (smoker) {
                userQuery.smoker = smoker;
            };
            /**workSchedule Property */
            if (workSchedule) {
                userQuery.workSchedule = workSchedule;
            };
            /**occupation Property */
            if (occupation) {
                userQuery.occupation = occupation;
            };

            /**This property stuck in case 1 user - n pets */
            // if (pet) {
            //     userQuery.pet = pet;
            // };
            console.log(userQuery);
            const userFilterList = await User.find(userQuery);
            return userFilterList
        },


        /**search query containing string input */
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


