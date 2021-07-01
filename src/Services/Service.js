import Fetch from "./Fetch";

class Service {
  static fetchBanks(city, offSet, pageSize) {
    return Fetch.get(
      `/api/banks?city=${city}&offSet=${offSet}&pageSize=${pageSize}`
    ).then(response => {
      if (response.success) {
        return response.banks;
      } else {
        throw new Error(response.message);
      }
    });
  }

  static getBankCount(city) {
    return Fetch.get(`/api/banks/count?city=${city}`).then(response => {
      if (response.success) {
        return response.count;
      } else {
        throw new Error(response.message);
      }
    });
  }

  static getBank(ifsc) {
    return Fetch.get(`/api/banks/${ifsc}`).then(response => {
      if (response.success) {
        return response.bank;
      } else {
        throw new Error(response.message);
      }
    });
  }

  static getBranches(city, branch, offSet, pageSize) {
    return Fetch.get(
      `/api/banks/branches/autocomplete?city=${city}&branch=${branch}&offSet=${offSet}&pageSize=${pageSize}`
    ).then(response => {
      if (response.success) {
        return response.branches;
      } else {
        return [];
      }
    });
  }

  static SearchBanks(city, offSet, pageSize, key) {
    return Fetch.get(
      `/api/banks/branches?city=${city}&offSet=${offSet}&pageSize=${pageSize}&key=${key}`
    ).then(response => {
      if (response.success) {
        return response.banks;
      } 
    });
  }

  static getBranchData(city, branch, offSet, pageSize) {
    return Fetch.get(
      `/api/bank/branch?city=${city}&branch=${branch}&offSet=${offSet}&pageSize=${pageSize}`
    ).then(response => {
      if (response.success) {
        return response.banks;
      } else {
        throw new Error(response.message);
      }
    });
  }
}

export default Service;
