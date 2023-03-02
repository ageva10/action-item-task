Storage.prototype.has = function(key: string) {
	return !!this.getItem(key)
}

Storage.prototype.set = function(key: string, value: any) {
	this.setItem(key, JSON.stringify(value))
}

Storage.prototype.get = function(key: string) {
	const data: any = this.getItem(key)
	return JSON.parse(data)
}

Storage.prototype.update = function(key: string, value: any) {
	const data: any = this.getItem(key)
	this.setItem(key, typeof value === 'object' ?
		JSON.stringify(Object.assign(JSON.parse(data), value)):
		JSON.stringify(value))
}

Storage.prototype.remove = function(key: string) {
	this.removeItem(key)
}

Storage.prototype.destroy = function() {
	this.clear()
}
