const state = {
    // gía trị mặc định của các bài post là mảng rỗng
    posts: [],
    paginate: {
        limit: 10,
        last: 0,
        current: 1,
        count: 0
    },
    // trạng thái loading khi gọi api
    loading: false,

    post: {
        id: null,
        title: null,
        description: null,
    }
}

export default state;
