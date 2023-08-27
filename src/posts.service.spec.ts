import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      { text: 'Post 1' },
      { text: 'Post 2' },
      { text: 'Post 3' },
      { text: 'Post 4' },
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const allPosts = postsService.findMany();
      const expectedPosts = allPosts.map(item => {
        return { text: item.text }
      })
      expect(expectedPosts).toEqual(posts)
    });

    it('should return correct posts for skip and limit options', () => {
      const allPosts = postsService.findMany({ limit: 2, skip: 1 });
      const expectedPosts = allPosts.map(item => {
        return { text: item.text }
      })

      // expect(postsService.findMany({ limit: 1, skip: 1 })).toContainEqual(expect.objectContaining(posts[1]))
      expect(expectedPosts).toEqual([posts[1], posts[2]])
    });

    it('should return correct posts for limit options', () => {
      expect(postsService.findMany({ limit: 1 })).toContainEqual(expect.objectContaining(posts[0]))
    });

    it('should return correct find posts', () => {
      expect(postsService.find('1')).toMatchObject(posts[0])
    });


  });
});