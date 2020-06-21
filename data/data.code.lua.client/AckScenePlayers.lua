module("AckScenePlayers", package.seeall)


function new()
	local tab_obj = {}
	setmetatable(tab_obj, {__index = AckScenePlayers})
	tab_obj:init()
	return tab_obj
end

function init(self)
	self.players = {}
end


function decode(self, pack)
	local players_count = pack:readU16()
	for i = 1, players_count do
		table.insert(self.players, MsgScenePlayer.new():decode(pack))
	end
	return self
end

return AckScenePlayers
