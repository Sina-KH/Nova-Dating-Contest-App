interface IService {
    start: () => Promise<void>;
    stop: () => Promise<void>;
}

export default IService;
