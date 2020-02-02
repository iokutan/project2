"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BaseService {
    constructor(pmodel) {
        this.model = pmodel;
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("RESUUULT 266666", data);
                return yield this.model.save(data);
            }
            catch (error) {
                console.log("RESUUULT 23333333", error);
                throw new Error(error);
            }
        });
    }
}
exports.BaseService = BaseService;
//# sourceMappingURL=BaseService.js.map