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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const member_service_1 = __importDefault(require("../services/member.service"));
class MemberController {
    constructor() {
        this.memberService = new member_service_1.default();
        this.createMember = this.createMember.bind(this);
        this.getMembers = this.getMembers.bind(this);
        this.getMemberById = this.getMemberById.bind(this);
        this.updateMember = this.updateMember.bind(this);
        this.deleteMember = this.deleteMember.bind(this);
    }
    // Create a new Member
    createMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstname, lastname, email, password, birthday, phonenumber } = req.body;
                // Ensure required fields are provided
                if (!firstname || !lastname || !email || !password || !birthday || !phonenumber) {
                    res.status(400).json({ message: 'All fields are required' });
                    return;
                }
                // Call the service to create a new Member
                const newMember = yield this.memberService.create({ firstname, lastname, email, password, birthday, phonenumber });
                res.status(201).json({ message: 'Member created successfully', Member: newMember });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating Member', error: error.message });
            }
        });
    }
    // Get all Members
    getMembers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const members = yield this.memberService.get();
                res.json(members);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching Members', error: error.message });
            }
        });
    }
    // Get a single Member by ID
    getMemberById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const member = yield this.memberService.get(req.params.id);
                if (!member) {
                    res.status(404).json({ message: 'Member not found' });
                    return;
                }
                res.json(member);
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching Member', error: error.message });
            }
        });
    }
    // Update Member by ID
    updateMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedMember = yield this.memberService.update(req.params.id, req.body);
                if (!updatedMember) {
                    res.status(404).json({ message: 'Member not found' });
                    return;
                }
                res.json({ message: 'Member updated successfully', Member: updatedMember });
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating Member', error: error.message });
            }
        });
    }
    // Delete Member by ID
    deleteMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedMember = yield this.memberService.delete(req.params.id);
                if (!deletedMember) {
                    res.status(404).json({ message: 'Member not found' });
                    return;
                }
                res.json({ message: 'Member deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting Member', error: error.message });
            }
        });
    }
}
exports.default = MemberController;
