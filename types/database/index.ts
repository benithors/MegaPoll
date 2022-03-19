/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/poll_options": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.poll_options.id"];
          option?: parameters["rowFilter.poll_options.option"];
          poll_question?: parameters["rowFilter.poll_options.poll_question"];
          votes?: parameters["rowFilter.poll_options.votes"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["poll_options"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** poll_options */
          poll_options?: definitions["poll_options"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.poll_options.id"];
          option?: parameters["rowFilter.poll_options.option"];
          poll_question?: parameters["rowFilter.poll_options.poll_question"];
          votes?: parameters["rowFilter.poll_options.votes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.poll_options.id"];
          option?: parameters["rowFilter.poll_options.option"];
          poll_question?: parameters["rowFilter.poll_options.poll_question"];
          votes?: parameters["rowFilter.poll_options.votes"];
        };
        body: {
          /** poll_options */
          poll_options?: definitions["poll_options"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/poll_options_voted": {
    get: {
      parameters: {
        query: {
          poll_question?: parameters["rowFilter.poll_options_voted.poll_question"];
          profile?: parameters["rowFilter.poll_options_voted.profile"];
          poll_option?: parameters["rowFilter.poll_options_voted.poll_option"];
          cookie_identifier?: parameters["rowFilter.poll_options_voted.cookie_identifier"];
          voted?: parameters["rowFilter.poll_options_voted.voted"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["poll_options_voted"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/poll_questions": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.poll_questions.id"];
          created_at?: parameters["rowFilter.poll_questions.created_at"];
          question?: parameters["rowFilter.poll_questions.question"];
          votes?: parameters["rowFilter.poll_questions.votes"];
          poll?: parameters["rowFilter.poll_questions.poll"];
          multipoll?: parameters["rowFilter.poll_questions.multipoll"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["poll_questions"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** poll_questions */
          poll_questions?: definitions["poll_questions"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.poll_questions.id"];
          created_at?: parameters["rowFilter.poll_questions.created_at"];
          question?: parameters["rowFilter.poll_questions.question"];
          votes?: parameters["rowFilter.poll_questions.votes"];
          poll?: parameters["rowFilter.poll_questions.poll"];
          multipoll?: parameters["rowFilter.poll_questions.multipoll"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.poll_questions.id"];
          created_at?: parameters["rowFilter.poll_questions.created_at"];
          question?: parameters["rowFilter.poll_questions.question"];
          votes?: parameters["rowFilter.poll_questions.votes"];
          poll?: parameters["rowFilter.poll_questions.poll"];
          multipoll?: parameters["rowFilter.poll_questions.multipoll"];
        };
        body: {
          /** poll_questions */
          poll_questions?: definitions["poll_questions"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/polls": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.polls.id"];
          created_at?: parameters["rowFilter.polls.created_at"];
          poll_name?: parameters["rowFilter.polls.poll_name"];
          poll_description?: parameters["rowFilter.polls.poll_description"];
          uuid?: parameters["rowFilter.polls.uuid"];
          cover_image?: parameters["rowFilter.polls.cover_image"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["polls"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** polls */
          polls?: definitions["polls"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.polls.id"];
          created_at?: parameters["rowFilter.polls.created_at"];
          poll_name?: parameters["rowFilter.polls.poll_name"];
          poll_description?: parameters["rowFilter.polls.poll_description"];
          uuid?: parameters["rowFilter.polls.uuid"];
          cover_image?: parameters["rowFilter.polls.cover_image"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.polls.id"];
          created_at?: parameters["rowFilter.polls.created_at"];
          poll_name?: parameters["rowFilter.polls.poll_name"];
          poll_description?: parameters["rowFilter.polls.poll_description"];
          uuid?: parameters["rowFilter.polls.uuid"];
          cover_image?: parameters["rowFilter.polls.cover_image"];
        };
        body: {
          /** polls */
          polls?: definitions["polls"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          username?: parameters["rowFilter.profiles.username"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles_2_poll_options": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_2_poll_options.id"];
          created_at?: parameters["rowFilter.profiles_2_poll_options.created_at"];
          cookie_identifier?: parameters["rowFilter.profiles_2_poll_options.cookie_identifier"];
          poll_option?: parameters["rowFilter.profiles_2_poll_options.poll_option"];
          poll_question?: parameters["rowFilter.profiles_2_poll_options.poll_question"];
          profile?: parameters["rowFilter.profiles_2_poll_options.profile"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles_2_poll_options"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles_2_poll_options */
          profiles_2_poll_options?: definitions["profiles_2_poll_options"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_2_poll_options.id"];
          created_at?: parameters["rowFilter.profiles_2_poll_options.created_at"];
          cookie_identifier?: parameters["rowFilter.profiles_2_poll_options.cookie_identifier"];
          poll_option?: parameters["rowFilter.profiles_2_poll_options.poll_option"];
          poll_question?: parameters["rowFilter.profiles_2_poll_options.poll_question"];
          profile?: parameters["rowFilter.profiles_2_poll_options.profile"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles_2_poll_options.id"];
          created_at?: parameters["rowFilter.profiles_2_poll_options.created_at"];
          cookie_identifier?: parameters["rowFilter.profiles_2_poll_options.cookie_identifier"];
          poll_option?: parameters["rowFilter.profiles_2_poll_options.poll_option"];
          poll_question?: parameters["rowFilter.profiles_2_poll_options.poll_question"];
          profile?: parameters["rowFilter.profiles_2_poll_options.profile"];
        };
        body: {
          /** profiles_2_poll_options */
          profiles_2_poll_options?: definitions["profiles_2_poll_options"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/rpc/fn_create_poll": {
    post: {
      parameters: {
        body: {
          args: {
            /** Format: character varying */
            cover_image: string;
            /** Format: json */
            poll_question_data: string;
            /** Format: character varying */
            poll_name: string;
            /** Format: character varying */
            poll_description: string;
          };
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferParams"];
        };
      };
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
}

export interface definitions {
  poll_options: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /** Format: character varying */
    option?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `poll_questions.id`.<fk table='poll_questions' column='id'/>
     */
    poll_question?: number;
    /** Format: bigint */
    votes?: number;
  };
  poll_options_voted: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `poll_questions.id`.<fk table='poll_questions' column='id'/>
     */
    poll_question?: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    profile?: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `poll_options.id`.<fk table='poll_options' column='id'/>
     */
    poll_option?: number;
    /** Format: uuid */
    cookie_identifier?: string;
    /** Format: boolean */
    voted?: boolean;
  };
  poll_questions: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    question: string;
    /** Format: bigint */
    votes?: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `polls.id`.<fk table='polls' column='id'/>
     */
    poll: number;
    /**
     * Format: boolean
     * @default true
     */
    multipoll: boolean;
  };
  polls: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: character varying */
    poll_name: string;
    /** Format: character varying */
    poll_description: string;
    /**
     * Format: uuid
     * @default extensions.uuid_generate_v4()
     */
    uuid: string;
    /** Format: character varying */
    cover_image?: string;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    username?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    website?: string;
  };
  profiles_2_poll_options: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: uuid */
    cookie_identifier: string;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `poll_options.id`.<fk table='poll_options' column='id'/>
     */
    poll_option: number;
    /**
     * Format: bigint
     * @description Note:
     * This is a Foreign Key to `poll_questions.id`.<fk table='poll_questions' column='id'/>
     */
    poll_question: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `profiles.id`.<fk table='profiles' column='id'/>
     */
    profile?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description poll_options */
  "body.poll_options": definitions["poll_options"];
  /** Format: bigint */
  "rowFilter.poll_options.id": string;
  /** Format: character varying */
  "rowFilter.poll_options.option": string;
  /** Format: bigint */
  "rowFilter.poll_options.poll_question": string;
  /** Format: bigint */
  "rowFilter.poll_options.votes": string;
  /** @description poll_options_voted */
  "body.poll_options_voted": definitions["poll_options_voted"];
  /** Format: bigint */
  "rowFilter.poll_options_voted.poll_question": string;
  /** Format: uuid */
  "rowFilter.poll_options_voted.profile": string;
  /** Format: bigint */
  "rowFilter.poll_options_voted.poll_option": string;
  /** Format: uuid */
  "rowFilter.poll_options_voted.cookie_identifier": string;
  /** Format: boolean */
  "rowFilter.poll_options_voted.voted": string;
  /** @description poll_questions */
  "body.poll_questions": definitions["poll_questions"];
  /** Format: bigint */
  "rowFilter.poll_questions.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.poll_questions.created_at": string;
  /** Format: character varying */
  "rowFilter.poll_questions.question": string;
  /** Format: bigint */
  "rowFilter.poll_questions.votes": string;
  /** Format: bigint */
  "rowFilter.poll_questions.poll": string;
  /** Format: boolean */
  "rowFilter.poll_questions.multipoll": string;
  /** @description polls */
  "body.polls": definitions["polls"];
  /** Format: bigint */
  "rowFilter.polls.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.polls.created_at": string;
  /** Format: character varying */
  "rowFilter.polls.poll_name": string;
  /** Format: character varying */
  "rowFilter.polls.poll_description": string;
  /** Format: uuid */
  "rowFilter.polls.uuid": string;
  /** Format: character varying */
  "rowFilter.polls.cover_image": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.username": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** Format: text */
  "rowFilter.profiles.website": string;
  /** @description profiles_2_poll_options */
  "body.profiles_2_poll_options": definitions["profiles_2_poll_options"];
  /** Format: bigint */
  "rowFilter.profiles_2_poll_options.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles_2_poll_options.created_at": string;
  /** Format: uuid */
  "rowFilter.profiles_2_poll_options.cookie_identifier": string;
  /** Format: bigint */
  "rowFilter.profiles_2_poll_options.poll_option": string;
  /** Format: bigint */
  "rowFilter.profiles_2_poll_options.poll_question": string;
  /** Format: uuid */
  "rowFilter.profiles_2_poll_options.profile": string;
}

export interface operations {}

export interface external {}
