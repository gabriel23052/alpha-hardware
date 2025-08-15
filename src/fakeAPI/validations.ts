const validations = {
  productIds: (ids: unknown): ids is string[] => {
    if (!(ids instanceof Array)) return false;
    for (const id of ids) {
      if (!/^[a-f\d]{9}$/i.test(id)) return false;
    }
    return true;
  },
};

export default validations;
