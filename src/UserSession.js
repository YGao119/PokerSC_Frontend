var UserSession = (function() {
    var username = "";
    var passwordHash = "";
  
    var getName = function() {
      return username;
    };
  
    var setName = function(name) {
      username = name;
    };

    var getHash = function() {
      return passwordHash;
    };
  
    var setHash = function(hash) {
      console.log("setHash " + hash);
      passwordHash = hash;
    };
  
    return {
      getName: getName,
      setName: setName,
      getHash: getHash,
      setHash: setHash
    }
  
})();
  
export default UserSession;