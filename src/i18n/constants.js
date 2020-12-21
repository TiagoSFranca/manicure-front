const INITIAL_MESSAGE = 'INITIAL_MESSAGE';
const LOADING_MESSAGE = "LOADING_MESSAGE";
const SEARCHING = "SEARCHING";
const DATA_NOT_FOUND = "DATA_NOT_FOUND";

const MATERIAL = {
  NAME: 'MATERIAL.NAME',
  LIST: {
    NAME: 'MATERIAL.LIST.NAME',
    PRICE: 'MATERIAL.LIST.PRICE',
    AVALIABLE_QTY: 'MATERIAL.LIST.AVALIABLE_QTY',
    MIN_QTY: 'MATERIAL.LIST.MIN_QTY',
    RESERVED_QTY: 'MATERIAL.LIST.RESERVED_QTY',
    USED_QTY: 'MATERIAL.LIST.USED_QTY',
    ACTIVE: 'MATERIAL.LIST.ACTIVE',
    MESSAGES: {
      CONFIRM_DELETE: {
        TITLE: "MATERIAL.LIST.MESSAGES.CONFIRM_DELETE.TITLE",
        MESSAGE: "MATERIAL.LIST.MESSAGES.CONFIRM_DELETE.MESSAGE",
      },
      CONFIRM_RESTORE: {
        TITLE: "MATERIAL.LIST.MESSAGES.CONFIRM_RESTORE.TITLE",
        MESSAGE: "MATERIAL.LIST.MESSAGES.CONFIRM_RESTORE.MESSAGE",
      },
    }
  },
  ADD: {
    NAME: 'MATERIAL.ADD.NAME',
    LABELS: {
      NAME: 'MATERIAL.ADD.LABELS.NAME',
      PRICE: 'MATERIAL.ADD.LABELS.PRICE',
      MIN_QTY: 'MATERIAL.ADD.LABELS.MIN_QTY',
      QTY: 'MATERIAL.ADD.LABELS.QTY',
    }
  },
  FILTER: {
    NAME: 'MATERIAL.FILTER.NAME',
    LABELS: {
      NAME: 'MATERIAL.FILTER.LABELS.NAME',
      ACTIVE: 'MATERIAL.FILTER.LABELS.ACTIVE',
      ACTIVE_OPTIONS: {
        ALL: 'MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.ALL',
        YES: 'MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.YES',
        NOT: 'MATERIAL.FILTER.LABELS.ACTIVE_OPTIONS.NOT',
      },
    }
  },
  EDIT: {
    NAME: 'MATERIAL.EDIT.NAME',
    LABELS: {
      ADD_ON_STOCK: "MATERIAL.EDIT.LABELS.ADD_ON_STOCK",
      REMOVE_FROM_STOCK: "MATERIAL.EDIT.LABELS.REMOVE_FROM_STOCK"
    }
  },
  CARD_INFO: {
    NAME: 'MATERIAL.CARD_INFO.NAME',
    LABELS: {
      NAME: 'MATERIAL.CARD_INFO.LABELS.NAME',
      PRICE: 'MATERIAL.CARD_INFO.LABELS.PRICE',
      MIN_QTY: 'MATERIAL.CARD_INFO.LABELS.MIN_QTY',
      AVALIABLE_QTY: 'MATERIAL.CARD_INFO.LABELS.QTY',
      RESERVED_QTY: 'MATERIAL.CARD_INFO.LABELS.RESERVED_QTY',
      USED_QTY: 'MATERIAL.CARD_INFO.LABELS.USED_QTY',
    },
    MESSAGES: {
      CONFIRM_UPDATE: {
        TITLE: 'MATERIAL.CARD_INFO.MESSAGES.CONFIRM_UPDATE.TITLE',
        MESSAGE: 'MATERIAL.CARD_INFO.MESSAGES.CONFIRM_UPDATE.MESSAGE',
      }
    }
  },
  STATUS: {
    OK: "MATERIAL.STATUS.OK",
    WARNING: "MATERIAL.STATUS.WARNING",
    ERROR: "MATERIAL.STATUS.ERROR",
  },
  UPDATE_STOCK: {
    NAME_ADD: "MATERIAL.UPDATE_STOCK.NAME_ADD",
    NAME_REMOVE: "MATERIAL.UPDATE_STOCK.NAME_REMOVE",
    LABELS: {
      QTY: "MATERIAL.UPDATE_STOCK.LABELS.QTY",
      COMMENTS: "MATERIAL.UPDATE_STOCK.LABELS.COMMENTS"
    }
  },
  DETAILS: {
    NAME: 'MATERIAL.DETAILS.NAME',
    LABELS: {
      YEAR: "MATERIAL.DETAILS.LABELS.YEAR",
      REGISTER_IN_YEAR: "MATERIAL.DETAILS.LABELS.REGISTER_IN_YEAR",
      REGISTER_TOTAL: "MATERIAL.DETAILS.LABELS.REGISTER_TOTAL",
      REGISTER: "MATERIAL.DETAILS.LABELS.REGISTER",
      REMOVE_IN_YEAR: "MATERIAL.DETAILS.LABELS.REMOVE_IN_YEAR",
      REMOVE_TOTAL: "MATERIAL.DETAILS.LABELS.REMOVE_TOTAL",
      REMOVE: "MATERIAL.DETAILS.LABELS.REMOVE",
    }
  },
  CARD_HISTORIC: {
    NAME: "MATERIAL.CARD_HISTORIC.NAME",
    LABELS: {
      INITIAL_DATE: "MATERIAL.CARD_HISTORIC.LABELS.INITIAL_DATE",
      FINAL_DATE: "MATERIAL.CARD_HISTORIC.LABELS.FINAL_DATE",
      STOCK_TYPE: "MATERIAL.CARD_HISTORIC.LABELS.STOCK_TYPE",
      STOCK_TYPE_MULTIPLE_SELECTED: "MATERIAL.CARD_HISTORIC.LABELS.STOCK_TYPE_MULTIPLE_SELECTED"
    },
    LIST: {
      DATE: "MATERIAL.CARD_HISTORIC.LIST.DATE",
      TYPE: "MATERIAL.CARD_HISTORIC.LIST.TYPE",
      QTY: "MATERIAL.CARD_HISTORIC.LIST.QTY",
      IS_SCHEDULE: "MATERIAL.CARD_HISTORIC.LIST.IS_SCHEDULE",
    }
  },
  STOCK_INFO: {
    LABELS: {
      DATE: "MATERIAL.STOCK_INFO.LABELS.DATE",
      TYPE: "MATERIAL.STOCK_INFO.LABELS.TYPE",
      QTY: "MATERIAL.STOCK_INFO.LABELS.QTY",
      COMMENTS: "MATERIAL.STOCK_INFO.LABELS.COMMENTS"
    }
  }
}

const DASHBOARD = {
  NAME: 'DASHBOARD.NAME',
}

const AGENDA = {
  NAME: 'AGENDA.NAME',
}

const SCHEDULE = {
  NAME: 'SCHEDULE.NAME',
  LIST: {
    ID: 'SCHEDULE.LIST.ID',
    CLIENT_NAME: 'SCHEDULE.LIST.CLIENT_NAME',
    SCHEDULE_STATUS_NAME: 'SCHEDULE.LIST.SCHEDULE_STATUS_NAME',
    DATE: 'SCHEDULE.LIST.DATE',
    IN_LOCO: 'SCHEDULE.LIST.IN_LOCO',
  },
  STATUS: {
    LATE: "SCHEDULE.STATUS.LATE",
    NO_PROBLEM: "SCHEDULE.STATUS.NO_PROBLEM",
    NEED_ITEMS: "SCHEDULE.STATUS.NEED_ITEMS",
    CANCELED: "SCHEDULE.STATUS.CANCELED",
    REALIZED: "SCHEDULE.STATUS.REALIZED"
  },
  ADD: {
    NAME: 'SCHEDULE.ADD.NAME',
    LABELS: {
      TOTAL: "SCHEDULE.ADD.LABELS.TOTAL"
    },
    MESSAGES: {
      NEED_PRODUCT_OR_COMBO: "SCHEDULE.ADD.MESSAGES.NEED_PRODUCT_OR_COMBO"
    },
    CARD_INFO: {
      NAME: "SCHEDULE.ADD.CARD_INFO.NAME",
      LABELS: {
        DATE: "SCHEDULE.ADD.CARD_INFO.LABELS.DATE",
        CLIENT: "SCHEDULE.ADD.CARD_INFO.LABELS.CLIENT",
        IN_LOCO: "SCHEDULE.ADD.CARD_INFO.LABELS.IN_LOCO"
      }
    },
    CARD_PRODUCTS: {
      NAME: "SCHEDULE.ADD.CARD_PRODUCTS.NAME",
      LABELS: {
        TOTAL: "SCHEDULE.ADD.CARD_PRODUCTS.LABELS.TOTAL"
      },
      MESSAGES: {
        CAN_NOT_ADD: "SCHEDULE.ADD.CARD_PRODUCTS.MESSAGES.CAN_NOT_ADD"
      }
    },
    CARD_COMBOS: {
      NAME: "SCHEDULE.ADD.CARD_COMBOS.NAME",
      LABELS: {
        TOTAL: "SCHEDULE.ADD.CARD_COMBOS.LABELS.TOTAL"
      },
      MESSAGES: {
        CAN_NOT_ADD: "SCHEDULE.ADD.CARD_COMBOS.MESSAGES.CAN_NOT_ADD"
      }
    },
    PRODUCT_ADD: {
      NAME: "SCHEDULE.ADD.PRODUCT_ADD.NAME",
      LABELS: {
        PRODUCT: "SCHEDULE.ADD.PRODUCT_ADD.LABELS.PRODUCT",
        QTY: "SCHEDULE.ADD.PRODUCT_ADD.LABELS.QTY"
      }
    },
    COMBO_ADD: {
      NAME: "SCHEDULE.ADD.COMBO_ADD.NAME",
      LABELS: {
        COMBO: "SCHEDULE.ADD.COMBO_ADD.LABELS.COMBO",
        QTY: "SCHEDULE.ADD.COMBO_ADD.LABELS.QTY"
      }
    },
    VERIFY_STOCK: {
      ERROR: {
        NAME: "SCHEDULE.ADD.VERIFY_STOCK.ERROR.NAME",
        MESSAGES: {
          CONFIRM_ADD: {
            TITLE: "SCHEDULE.ADD.VERIFY_STOCK.ERROR.MESSAGES.CONFIRM_ADD.TITLE",
            MESSAGE: "SCHEDULE.ADD.VERIFY_STOCK.ERROR.MESSAGES.CONFIRM_ADD.MESSAGE"
          }
        }
      },
      PRODUCT: {
        LABELS: {
          MATERIAL: "SCHEDULE.ADD.VERIFY_ERROR.PRODUCT.LABELS.MATERIAL",
          QTY: "SCHEDULE.ADD.VERIFY_ERROR.PRODUCT.LABELS.QTY"
        }
      }
    }
  },
  CARD_QUESTIONS: {
    NAME: "SCHEDULE.CARD_QUESTIONS.NAME",
    LABELS: {
      FORMAT: "SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT",
      FORMAT_OPTIONS: {
        NONE: "SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.NONE",
        ROUND: "SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.ROUND",
        SQUARE: "SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.SQUARE",
        OVAL: "SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.OVAL",
        POINTED: "SCHEDULE.CARD_QUESTIONS.LABELS.FORMAT_OPTIONS.POINTED",
      },
      COLOR: "SCHEDULE.CARD_QUESTIONS.LABELS.COLOR",
      COLOR_OPTIONS: {
        NONE: "SCHEDULE.CARD_QUESTIONS.LABELS.COLOR_OPTIONS.NONE",
        BRIGHT: "SCHEDULE.CARD_QUESTIONS.LABELS.COLOR_OPTIONS.BRIGHT",
        DARK: "SCHEDULE.CARD_QUESTIONS.LABELS.COLOR_OPTIONS.DARK",
      },
      HAS_ONYCHOMYCOSIS: "SCHEDULE.CARD_QUESTIONS.LABELS.HAS_ONYCHOMYCOSIS",
      USE_ONYCHOMYCOSIS_MEDICINE: "SCHEDULE.CARD_QUESTIONS.LABELS.USE_ONYCHOMYCOSIS_MEDICINE",
      ONYCHOMYCOSIS_MEDICINE: "SCHEDULE.CARD_QUESTIONS.LABELS.ONYCHOMYCOSIS_MEDICINE",
      DIABETES: "SCHEDULE.CARD_QUESTIONS.LABELS.DIABETES",
      ALLERGY: "SCHEDULE.CARD_QUESTIONS.LABELS.ALLERGY",
      ALLERGY_MEDICINE: "SCHEDULE.CARD_QUESTIONS.LABELS.ALLERGY_MEDICINE",
      ANTICOAGULANT_MEDICATION: "SCHEDULE.CARD_QUESTIONS.LABELS.ANTICOAGULANT_MEDICATION",
      COMMENTS: "SCHEDULE.CARD_QUESTIONS.LABELS.COMMENTS",
    }
  },
  CANCEL: {
    NAME: "SCHEDULE.CANCEL.NAME",
    LABELS: {
      CANCELLATION_REASON: "SCHEDULE.CANCEL.LABELS.CANCELLATION_REASON"
    },
    MESSAGES: {
      CONFIRM_CANCEL: "SCHEDULE.CANCEL.MESSAGES.CONFIRM_CANCEL"
    }
  },
  FINISH: {
    NAME: 'SCHEDULE.FINISH.NAME',
    LABELS: {
      TOTAL: "SCHEDULE.FINISH.LABELS.TOTAL"
    },
  },
  CARD_MATERIALS: {
    NAME: "SCHEDULE.CARD_MATERIALS.NAME",
    LABELS: {
      MATERIAL: "SCHEDULE.CARD_MATERIALS.LABELS.MATERIAL",
      RESERVED_QTY: "SCHEDULE.CARD_MATERIALS.LABELS.RESERVED_QTY",
      USED_QTY: "SCHEDULE.CARD_MATERIALS.LABELS.USED_QTY",
    },
    MESSAGES: {
      CAN_NOT_ADD: "SCHEDULE.CARD_MATERIALS.MESSAGES.CAN_NOT_ADD"
    }
  },
  CARD_INFO: {
    NAME: "SCHEDULE.CARD_INFO.NAME",
    LABELS: {
      DATE: "SCHEDULE.CARD_INFO.LABELS.DATE",
      CLIENT: "SCHEDULE.CARD_INFO.LABELS.CLIENT",
      IN_LOCO: "SCHEDULE.CARD_INFO.LABELS.IN_LOCO"
    }
  },
  MATERIAL_ADD: {
    NAME: "SCHEDULE.MATERIAL_ADD.NAME",
    LABELS: {
      MATERIAL: "SCHEDULE.MATERIAL_ADD.LABELS.MATERIAL",
      QTY: "SCHEDULE.MATERIAL_ADD.LABELS.QTY"
    }
  },
  DETAILS: {
    NAME: 'SCHEDULE.DETAILS.NAME',
    LABELS: {
      TOTAL: "SCHEDULE.DETAILS.LABELS.TOTAL"
    },
  },
  CARD_PRODUCTS: {
    NAME: "SCHEDULE.CARD_PRODUCTS.NAME",
    LABELS: {
      TOTAL: "SCHEDULE.CARD_PRODUCTS.LABELS.TOTAL"
    },
  },
  CARD_COMBOS: {
    NAME: "SCHEDULE.CARD_COMBOS.NAME",
    LABELS: {
      TOTAL: "SCHEDULE.CARD_COMBOS.LABELS.TOTAL"
    }
  },
}

const PRODUCT = {
  NAME: 'PRODUCT.NAME',
  LIST: {
    NAME: 'PRODUCT.LIST.NAME',
    PRICE: 'PRODUCT.LIST.PRICE',
    PROMOTIONAL_PRICE: 'PRODUCT.LIST.PROMOTIONAL_PRICE',
    ON_SALE: 'PRODUCT.LIST.ON_SALE',
    END_SALE: 'PRODUCT.LIST.END_SALE',
    ACTIVE: 'PRODUCT.LIST.ACTIVE',
  },
  ADD: {
    NAME: 'PRODUCT.ADD.NAME',
    LABELS: {
      NAME: 'PRODUCT.ADD.LABELS.NAME',
      PRICE: 'PRODUCT.ADD.LABELS.PRICE',
      PROMOTIONAL_PRICE: 'PRODUCT.ADD.LABELS.PROMOTIONAL_PRICE',
      ON_SALE: 'PRODUCT.ADD.LABELS.ON_SALE',
      END_SALE: 'PRODUCT.ADD.LABELS.END_SALE',
      ACTIVE: 'PRODUCT.ADD.LABELS.ACTIVE',
      COMMENTS: 'PRODUCT.ADD.LABELS.COMMENTS',
    },
    MESSAGES: {
      REDIRECT_TO_EDIT: {
        TITLE: 'PRODUCT.ADD.MESSAGES.REDIRECT_TO_EDIT.TITLE',
        MESSAGE: 'PRODUCT.ADD.MESSAGES.REDIRECT_TO_EDIT.MESSAGE',
      }
    }
  },
  FILTER: {
    NAME: 'PRODUCT.FILTER.NAME',
    LABELS: {
      NAME: 'PRODUCT.FILTER.LABELS.NAME',
      BEGIN_END_SALE: 'PRODUCT.FILTER.LABELS.BEGIN_END_SALE',
      END_END_SALE: 'PRODUCT.FILTER.LABELS.END_END_SALE',
      ACTIVE: 'PRODUCT.FILTER.LABELS.ACTIVE',
      ACTIVE_OPTIONS: {
        ALL: 'PRODUCT.FILTER.LABELS.ACTIVE_OPTIONS.ALL',
        YES: 'PRODUCT.FILTER.LABELS.ACTIVE_OPTIONS.YES',
        NOT: 'PRODUCT.FILTER.LABELS.ACTIVE_OPTIONS.NOT',
      },
      ON_SALE: 'PRODUCT.FILTER.LABELS.ON_SALE',
      ON_SALE_OPTIONS: {
        ALL: 'PRODUCT.FILTER.LABELS.ON_SALE_OPTIONS.ALL',
        YES: 'PRODUCT.FILTER.LABELS.ON_SALE_OPTIONS.YES',
        NOT: 'PRODUCT.FILTER.LABELS.ON_SALE_OPTIONS.NOT',
      }
    }
  },
  EDIT: {
    NAME: 'PRODUCT.EDIT.NAME',
  },
  CARD_INFO: {
    NAME: 'PRODUCT.CARD_INFO.NAME',
    LABELS: {
      NAME: 'PRODUCT.CARD_INFO.LABELS.NAME',
      PRICE: 'PRODUCT.CARD_INFO.LABELS.PRICE',
      PROMOTIONAL_PRICE: 'PRODUCT.CARD_INFO.LABELS.PROMOTIONAL_PRICE',
      ON_SALE: 'PRODUCT.CARD_INFO.LABELS.ON_SALE',
      END_SALE: 'PRODUCT.CARD_INFO.LABELS.END_SALE',
      ACTIVE: 'PRODUCT.CARD_INFO.LABELS.ACTIVE',
      COMMENTS: 'PRODUCT.CARD_INFO.LABELS.COMMENTS',
    },
    MESSAGES: {
      CONFIRM_UPDATE: {
        TITLE: 'PRODUCT.CARD_INFO.MESSAGES.CONFIRM_UPDATE.TITLE',
        MESSAGE: 'PRODUCT.CARD_INFO.MESSAGES.CONFIRM_UPDATE.MESSAGE',
      }
    }
  },
  CARD_MATERIALS: {
    NAME: 'PRODUCT.CARD_MATERIALS.NAME',
    LABELS: {
      TOTAL: 'PRODUCT.CARD_MATERIALS.LABELS.TOTAL',
    },
  },
  CARD_COMBOS: {
    NAME: 'PRODUCT.CARD_COMBOS.NAME',
  },
  CARD_IMAGES: {
    NAME: 'PRODUCT.CARD_IMAGES.NAME',
    LABELS: {
      ADD_IMAGE: 'PRODUCT.CARD_IMAGES.LABELS.ADD_IMAGE',
    },
    MESSAGES: {
      CONFIRM_DELETE: {
        TITLE: 'PRODUCT.CARD_IMAGES.MESSAGES.CONFIRM_DELETE.TITLE',
        MESSAGE: 'PRODUCT.CARD_IMAGES.MESSAGES.CONFIRM_DELETE.MESSAGE',
      }
    }
  },
  MATERIAL_ITEM: {
    LABELS: {
      QTY: 'PRODUCT.MATERIAL_ITEM.LABELS.QTY',
      PRICE: 'PRODUCT.MATERIAL_ITEM.LABELS.PRICE',
      TOTAL: 'PRODUCT.MATERIAL_ITEM.LABELS.TOTAL',
    },
    MESSAGES: {
      CONFIRM_DELETE: {
        TITLE: 'PRODUCT.MATERIAL_ITEM.MESSAGES.CONFIRM_DELETE.TITLE',
        MESSAGE: 'PRODUCT.MATERIAL_ITEM.MESSAGES.CONFIRM_DELETE.MESSAGE',
      },
      CONFIRM_UPDATE: {
        TITLE: 'PRODUCT.MATERIAL_ITEM.MESSAGES.CONFIRM_UPDATE.TITLE',
        MESSAGE: 'PRODUCT.MATERIAL_ITEM.MESSAGES.CONFIRM_UPDATE.MESSAGE',
      },
    }
  },
  MATERIAL_ADD: {
    NAME: 'PRODUCT.MATERIAL_ADD.NAME',
    LABELS: {
      MATERIAL: 'PRODUCT.MATERIAL_ADD.LABELS.MATERIAL',
      QTY: 'PRODUCT.MATERIAL_ADD.LABELS.QTY',
    },
  }
}

const COMBO = {
  NAME: 'COMBO.NAME',
  LIST: {
    NAME: 'COMBO.LIST.NAME',
    PRICE: 'COMBO.LIST.PRICE',
    PROMOTIONAL_PRICE: 'COMBO.LIST.PROMOTIONAL_PRICE',
    ON_SALE: 'COMBO.LIST.ON_SALE',
    END_SALE: 'COMBO.LIST.END_SALE',
    ACTIVE: 'COMBO.LIST.ACTIVE',
  },
  ADD: {
    NAME: 'COMBO.ADD.NAME',
    LABELS: {
      NAME: 'COMBO.ADD.LABELS.NAME',
      PRICE: 'COMBO.ADD.LABELS.PRICE',
      PROMOTIONAL_PRICE: 'COMBO.ADD.LABELS.PROMOTIONAL_PRICE',
      ON_SALE: 'COMBO.ADD.LABELS.ON_SALE',
      END_SALE: 'COMBO.ADD.LABELS.END_SALE',
      ACTIVE: 'COMBO.ADD.LABELS.ACTIVE',
      COMMENTS: 'COMBO.ADD.LABELS.COMMENTS',
    },
    MESSAGES: {
      REDIRECT_TO_EDIT: {
        TITLE: 'COMBO.ADD.MESSAGES.REDIRECT_TO_EDIT.TITLE',
        MESSAGE: 'COMBO.ADD.MESSAGES.REDIRECT_TO_EDIT.MESSAGE',
      }
    }
  },
  FILTER: {
    NAME: 'COMBO.FILTER.NAME',
    LABELS: {
      NAME: 'COMBO.FILTER.LABELS.NAME',
      BEGIN_END_SALE: 'COMBO.FILTER.LABELS.BEGIN_END_SALE',
      END_END_SALE: 'COMBO.FILTER.LABELS.END_END_SALE',
      ACTIVE: 'COMBO.FILTER.LABELS.ACTIVE',
      ACTIVE_OPTIONS: {
        ALL: 'COMBO.FILTER.LABELS.ACTIVE_OPTIONS.ALL',
        YES: 'COMBO.FILTER.LABELS.ACTIVE_OPTIONS.YES',
        NOT: 'COMBO.FILTER.LABELS.ACTIVE_OPTIONS.NOT',
      },
      ON_SALE: 'COMBO.FILTER.LABELS.ON_SALE',
      ON_SALE_OPTIONS: {
        ALL: 'COMBO.FILTER.LABELS.ON_SALE_OPTIONS.ALL',
        YES: 'COMBO.FILTER.LABELS.ON_SALE_OPTIONS.YES',
        NOT: 'COMBO.FILTER.LABELS.ON_SALE_OPTIONS.NOT',
      }
    }
  },
  EDIT: {
    NAME: 'COMBO.EDIT.NAME',
  },
  CARD_INFO: {
    NAME: 'COMBO.CARD_INFO.NAME',
    LABELS: {
      NAME: 'COMBO.CARD_INFO.LABELS.NAME',
      PRICE: 'COMBO.CARD_INFO.LABELS.PRICE',
      PROMOTIONAL_PRICE: 'COMBO.CARD_INFO.LABELS.PROMOTIONAL_PRICE',
      ON_SALE: 'COMBO.CARD_INFO.LABELS.ON_SALE',
      END_SALE: 'COMBO.CARD_INFO.LABELS.END_SALE',
      ACTIVE: 'COMBO.CARD_INFO.LABELS.ACTIVE',
      COMMENTS: 'COMBO.CARD_INFO.LABELS.COMMENTS',
    },
    MESSAGES: {
      CONFIRM_UPDATE: {
        TITLE: 'COMBO.CARD_INFO.MESSAGES.CONFIRM_UPDATE.TITLE',
        MESSAGE: 'COMBO.CARD_INFO.MESSAGES.CONFIRM_UPDATE.MESSAGE',
      }
    }
  },
  CARD_PRODUCTS: {
    NAME: 'COMBO.CARD_PRODUCTS.NAME',
    LABELS: {
      TOTAL: 'COMBO.CARD_PRODUCTS.LABELS.TOTAL',
    },
  },
  CARD_IMAGES: {
    NAME: 'COMBO.CARD_IMAGES.NAME',
    LABELS: {
      ADD_IMAGE: 'COMBO.CARD_IMAGES.LABELS.ADD_IMAGE',
    },
    MESSAGES: {
      CONFIRM_DELETE: {
        TITLE: 'COMBO.CARD_IMAGES.MESSAGES.CONFIRM_DELETE.TITLE',
        MESSAGE: 'COMBO.CARD_IMAGES.MESSAGES.CONFIRM_DELETE.MESSAGE',
      }
    }
  },
  PRODUCT_ITEM: {
    LABELS: {
      QTY: 'COMBO.PRODUCT_ITEM.LABELS.QTY',
      PRICE: 'COMBO.PRODUCT_ITEM.LABELS.PRICE',
    },
    MESSAGES: {
      CONFIRM_DELETE: {
        TITLE: 'COMBO.PRODUCT_ITEM.MESSAGES.CONFIRM_DELETE.TITLE',
        MESSAGE: 'COMBO.PRODUCT_ITEM.MESSAGES.CONFIRM_DELETE.MESSAGE',
      },
      CONFIRM_UPDATE: {
        TITLE: 'COMBO.PRODUCT_ITEM.MESSAGES.CONFIRM_UPDATE.TITLE',
        MESSAGE: 'COMBO.PRODUCT_ITEM.MESSAGES.CONFIRM_UPDATE.MESSAGE',
      },
    }
  },
  PRODUCT_ADD: {
    NAME: 'COMBO.PRODUCT_ADD.NAME',
    LABELS: {
      PRODUCT: 'COMBO.PRODUCT_ADD.LABELS.PRODUCT',
      QTY: 'COMBO.PRODUCT_ADD.LABELS.QTY',
    },
  }
}

const CLIENT = {
  NAME: 'CLIENT.NAME',
  LIST: {
    NAME: 'CLIENT.LIST.NAME',
    NICKNAME: 'CLIENT.LIST.NICKNAME',
    BIRTHDAY: 'CLIENT.LIST.BIRTHDAY',
    PHONE: 'CLIENT.LIST.PHONE',
    CELL_PHONE: 'CLIENT.LIST.CELL_PHONE',
    SEX: 'CLIENT.LIST.SEX',
  },
  ADD: {
    NAME: 'CLIENT.ADD.NAME',
    LABELS: {
      NAME: 'CLIENT.ADD.LABELS.NAME',
      NICKNAME: 'CLIENT.ADD.LABELS.NICKNAME',
      SEX_OPTIONS: {
        MALE: 'CLIENT.ADD.LABELS.SEX_OPTIONS.MALE',
        FEMALE: 'CLIENT.ADD.LABELS.SEX_OPTIONS.FEMALE'
      },
      EMAIL: 'CLIENT.ADD.LABELS.EMAIL',
      BIRTHDAY: 'CLIENT.ADD.LABELS.BIRTHDAY',
      PHONE: 'CLIENT.ADD.LABELS.PHONE',
      CELL_PHONE: 'CLIENT.ADD.LABELS.CELL_PHONE',
      OCCUPATION: 'CLIENT.ADD.LABELS.OCCUPATION',
      ADDRESS: {
        STREET: 'CLIENT.ADD.LABELS.ADDRESS.STREET',
        NUMBER: 'CLIENT.ADD.LABELS.ADDRESS.NUMBER',
        DISTRICT: 'CLIENT.ADD.LABELS.ADDRESS.DISTRICT',
        COUNTRY: 'CLIENT.ADD.LABELS.ADDRESS.COUNTRY',
        CITY: 'CLIENT.ADD.LABELS.ADDRESS.CITY',
        COMPLEMENT: 'CLIENT.ADD.LABELS.ADDRESS.COMPLEMENT',
      },
    }
  },
  FILTER: {},
}

const PAGINATION = {
  SHOWING: "PAGINATION.SHOWING",
  FROM: 'PAGINATION.FROM',
  ITEMS: 'PAGINATION.ITEMS'
}

const GENERAL = {
  LABELS: {
    ON_SALE: 'GENERAL.LABELS.ON_SALE',
    QTY: 'GENERAL.LABELS.QTY',
    PRICE: 'GENERAL.LABELS.PRICE',
    TOTAL: 'GENERAL.LABELS.TOTAL',
  },
  MESSAGES: {
    DIGIT_MIN_LENGTH_TO_SEARCH: 'GENERAL.MESSAGES.DIGIT_MIN_LENGTH_TO_SEARCH',
    PAGE_NOT_FOUND: {
      TITLE: "GENERAL.MESSAGES.PAGE_NOT_FOUND.TITLE",
      MESSAGE: "GENERAL.MESSAGES.PAGE_NOT_FOUND.MESSAGE",
      COME_BACK: "GENERAL.MESSAGES.PAGE_NOT_FOUND.COME_BACK"
    },
    RESOURCE_NOT_FOUND: {
      TITLE: "GENERAL.MESSAGES.RESOURCE_NOT_FOUND.TITLE",
      MESSAGE: "GENERAL.MESSAGES.RESOURCE_NOT_FOUND.MESSAGE",
      COME_BACK: "GENERAL.MESSAGES.RESOURCE_NOT_FOUND.COME_BACK"
    },
    NO_CONNECTION: {
      TITLE: "GENERAL.MESSAGES.NO_CONNECTION.TITLE",
      FIRST_MESSAGE: "GENERAL.MESSAGES.NO_CONNECTION.FIRST_MESSAGE",
      SECOND_MESSAGE: "GENERAL.MESSAGES.NO_CONNECTION.SECOND_MESSAGE",
      COME_BACK: "GENERAL.MESSAGES.NO_CONNECTION.COME_BACK",
      CLOSE: "GENERAL.MESSAGES.NO_CONNECTION.CLOSE"
    },
  }
}

export default {
  INITIAL_MESSAGE,
  LOADING_MESSAGE,
  SEARCHING,
  DATA_NOT_FOUND,
  MATERIAL,
  DASHBOARD,
  AGENDA,
  SCHEDULE,
  PRODUCT,
  COMBO,
  CLIENT,
  PAGINATION,
  GENERAL
}