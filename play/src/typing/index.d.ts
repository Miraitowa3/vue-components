import type { Ref } from 'vue';

export interface IconType {
    iconLayout: string;
    iconRadius: number;
    iconSize: number;
    iconX: number;
    iconY: number;
    name: number;
    nameColor: string;
    nameSize: number;
    opactiy: number;
    startAnimation: boolean;
    unit: string;
    width: number;
    xysync: boolean;
}
export interface SidebarType {
    autoHide: boolean;
    lastGroup: boolean;
    mouseGroup: boolean;
    opacity: number;
    placement: string;
    width: number;
}
export interface LayoutType {
    view: string;
    yiyan: boolean;
}
export interface OpenType {
    iconBlank: boolean;
    searchBlank: boolean;
}
export interface SearchType {
    bgColor: number;
    height: number;
    history: boolean;
    radius: number;
    show: boolean;
    translate: string;
    translateHide: boolean;
}
export interface TimeType {
    color: string;
    font: string;
    fontWeight: string,
    hour24: string,
    lunar:string,
    month: string,
    sec: string,
    show: boolean,
    size: number,
    week: string,
    [key: string]: any;
};

export interface SearchEngineItem {
    key: string;
    title: string;
    href: string;

};
export interface ThemeType {
    mode: string;
    system: boolean;
    color: string;

};

export interface InfiniteScrollOptions<T> {
  fetchFn: (page: number, signal?: AbortSignal) => Promise<T[]>;
  initialData?: T[];
  threshold?: number;
  pageSize?: number;
  immediate?: boolean;
  plugins?: InfiniteScrollPlugin[];
}

export interface InfiniteScrollState<T> {
  data: T[];
  page: number;
  isLoading: boolean;
  error: Error | null;
  hasMore: boolean;
  retryCount: number;
}

export interface InfiniteScrollContext<T> {
  state: Readonly<InfiniteScrollState<T>>;
  abortController: AbortController | null;
  sentinelRef: Ref<HTMLElement | null>;
  observer: IntersectionObserver | null;
}

export interface InfiniteScrollPlugin {
  name: string;
  install<T>(context: InfiniteScrollContext<T>): {
    onBeforeFetch?: () => void;
    onAfterFetch?: (data: T[]) => void;
    onError?: (error: Error) => void;
    onRetry?: () => void;
    onReset?: () => void;
  };
}

export interface UseInfiniteScrollReturn<T> {
  data: Ref<T[]>;
  isLoading: Ref<boolean>;
  error: Ref<Error | null>;
  hasMore: Ref<boolean>;
  retry: () => Promise<void>;
  reset: () => void;
  sentinelRef: Ref<HTMLElement | null>;
  use: (plugin: InfiniteScrollPlugin) => void;
}

export interface ResponseData<T>  {
  data: T;
  code: number;
  message: string;
}
export type ApiResponseType<T>=Promise<ResponseData<T>>;
