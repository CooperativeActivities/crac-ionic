/**
 * Created by p23460 on 14.09.2016.
 */
cracApp.factory('OrganisationService', ["$http", function($http){
    var organisations = [];
    organisations[0] = {"id": "rk","name":"Rotes Kreuz", "notify":true};
    organisations[1] = {"id": "wds","name":"Waldorfschule","notify":false};

    var srv = {};

    srv.getOrganisationsForUser = function(userId){
        return organisations;
    }

    srv.changeNotification = function(orgId,notify){
        for(var i=0; i <organisations.length;i++){
            if(organisations[i].id==orgId){
                organisations[i].notify = notify;
                return;
            }
        }
    }

    /**
     * EXPOSE Service Methods
     **/
    return {
        getOrganisationsForUser : function(userId){
            return srv.getOrganisationsForUser(userId);
        },

        changeNotification : function(orgId,notify){
            return srv.changeNotification(orgId,notify);
        }
    }
}])