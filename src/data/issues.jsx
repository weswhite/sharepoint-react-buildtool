function getFormDigestByUrl(siteBaseUrl) {
                var dfd = $q.defer();
                //Http post to the context info rest service
                $http({
                    url: baseUrl + "/_api/contextinfo?$select=FormDigestValue",
                    method: "POST",
                    headers: {
                        "accept": "application/json;odata=verbose",
                    }
                }).success(function (data) {
                    //Resolve the FormDigestValue from the success callback.
                    dfd.resolve(data.d.GetContextWebInformation.FormDigestValue);
                }).error(function (error) {
                    dfd.reject("Error finding form digest");
                });
                return dfd.promise;
            }


var updateAWorkProduct = function (item) {
                var deferred = $q.defer();
                getFormDigestByUrl(baseUrl).then(function (formdigest) {
                    var ListName = "WorkProductList"
                    //var data = item;
                    var data =
                        {
                            Id: item.Id,
                            JurisdictionId: item.Jurisdiction ? item.Jurisdiction.Id : 0,
                            Publish: item.Publish,
                            Title: item.Title,
                            WPStatusId: item.WPStatus ? item.WPStatus.Id : 0,
                            WPTypeId: item.WPType ? item.WPType.Id : 0,
                            WPActCompDate: item.WPActCompDate,
                            WPClientDueDate: item.WPClientDueDate,
                            WPCurrentlyWithId: item.WPCurrentlyWith ? item.WPCurrentlyWith.Id : 21,
                            WPEstCompDate: item.WPEstCompDate,
                            WPDescription: item.WPDescription,
                            WPExtDueDate: item.WPExtDueDate,
                            WPFavorite: item.WPFavorite,
                            WPMIssingInfo: item.WPMIssingInfo,
                            WPOwnerId: item.WPOwner ? item.WPOwner.Id : 21,
                            WPStartDate: item.WPStartDate,
                            WPStatutoryDueDate: item.WPStatutoryDueDate,
                            WPEngagementId: item.WPEngagementId ? item.WPEngagementId : 1,
                            WPEntityId: {
                                results: item.WPEntityId ? item.WPEntityId.results : []
                            }
                        }
                    data.__metadata = {
                        type: "SP.Data." + ListName + "ListItem"
                    };
                    $http.defaults.headers.post['X-HTTP-Method'] = "MERGE";
                    $http.defaults.headers.common.Accept = "application/json;odata=verbose";
                    $http.defaults.headers.post['Content-Type'] = 'application/json;odata=verbose';
                    $http.defaults.headers.post['X-RequestDigest'] = formdigest;
                    $http.defaults.headers.post['If-Match'] = item.__metadata.etag;
                    var restUrl = baseUrl + "/_api/web/lists/getbytitle('WorkProductList')/items(" + data.Id + ")";

                    $http.post(restUrl, JSON.stringify(data))
                        .success(function (result) {
                            deferred.resolve(result);
                        })
                       .error(function (result, status) {
                           deferred.reject(status);
                       });
                }, function (error) {
                    console.error("Error retrieving form digest value: ", error);
                });
                return deferred.promise;
            };
