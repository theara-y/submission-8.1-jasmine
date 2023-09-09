describe('Tests for: servers.js', function() {
  beforeAll(function() {
    mockServer = 'Alice';

    mockServers = ['Alice', 'Bob', 'Colt'];

    mockAllServers = {
      server1: {serverName: 'Alice'},
      server2: {serverName: 'Bob'},
      server3: {serverName: 'Colt'},
    }
  });

  describe('When submitServerInfo is called...', function() {
    beforeEach(function() {
      allServers = {};
      serverId = 0;
      updateServerTable();
    });

    it('should add a new server to allServers', function() {
      serverNameInput.value = mockServer;
      submitServerInfo();

      expect(serverId).toEqual(1);
      expect(Object.keys(allServers).length).toEqual(1);
      expect(allServers['server' + serverId].serverName).toEqual(mockServer);
    });

    it('should add multiple servers to allServers', function() {
      mockServers.forEach(server => {
        serverNameInput.value = server;
        submitServerInfo();
      })

      expect(Object.keys(allServers).length).toEqual(mockServers.length);
      expect(allServers['server' + serverId].serverName).toEqual(mockServers[serverId - 1]);
    })

    afterEach(function() {
      allServers = {};
      serverId = 0;
      updateServerTable();
    })

  });

  describe('When updateServerTable is called...', function() {
    it('should reset and clear serverTbody', function() {
      updateServerTable();
      expect(serverTbody.innerHTML).toEqual('');
    });

    it('should create one table row per server in allServers', function() {
      allServers = mockAllServers;
      updateServerTable();

      expect(serverTbody.children[0].tagName).toEqual('TR');
      expect(serverTbody.children[1].tagName).toEqual('TR');
      expect(serverTbody.children[2].tagName).toEqual('TR');
      expect(serverTbody.children.length).toEqual(3);
    })

    afterEach(function() {
      allServers = {};
      serverId = 0;
      updateServerTable();
    });
  });
});
