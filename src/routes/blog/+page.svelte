<script lang="ts">
  import { base } from '$app/paths';

  const posts = [
    {
      href: '/blog/posts/post1',
      title: 'Why High Specificity Is Killing Your CSS',
      description: 'Discover how overly specific selectors create maintenance nightmares and how to spot them before they spread.'
    },
    {
      href: '/blog/posts/post2',
      title: 'Understanding the True Cost of #IDs in CSS',
      description: 'Learn why using ID selectors destroys reusability and forces !important usage — with real-world examples.'
    },
    {
      href: '/blog/posts/post3',
      title: 'How :is() and :where() Can Reduce Specificity by 90%',
      description: 'Master these modern pseudo-classes to write cleaner, lower-specificity CSS that’s easier to override.'
    },
    {
      href: '/blog/posts/post4',
      title: 'The Hidden Danger of Nested Selectors',
      description: 'Why ul li a is worse than you think — and how to safely refactor deeply nested rules without breaking styles.'
    },
    {
      href: '/blog/posts/post5',
      title: 'When !important Is Actually the Right Tool',
      description: 'Rare cases where !important improves maintainability — and how to detect when it’s truly justified.'
    },
    {
      href: '/blog/posts/post6',
      title: 'Refactoring Legacy CSS: A Step-by-Step Strategy',
      description: 'Proven method to safely lower specificity in large codebases without visual regressions.'
    },
    {
      href: '/blog/posts/post7',
      title: 'How This Tool Calculates Specificity (And Why It’s More Accurate)',
      description: 'Deep dive into our zero-dependency parser and how it handles :has(), nesting, and modern selectors correctly.'
    }
  ];
</script>

<svelte:head>
  <title>Blog | CSS Specificity Refactor Tool</title>
  <meta name="description" content="Technical deep dives, best practices, and advanced tips for writing maintainable, low-specificity CSS." />
</svelte:head>

<br/>
<br/>
<br/>

<div class="container fade-in blog-index" style="padding:100px">
  <header class="blog-header">
    <h1>Blog: Mastering CSS Specificity</h1>
    <p class="subtitle">
      Advanced techniques, real-world patterns, and deep insights to help you write cleaner, more maintainable CSS.
      All tools and code are open-source on <a href="https://github.com/axelbase/css-specificity-refactor" target="_blank" rel="noopener">GitHub</a>.
    </p>
  </header>

  <div class="posts-grid">
    {#each posts as post}
      <a href="{base}{post.href}" class="card post-card">
        <div class="card-body">
          <h2 class="post-title">{post.title}</h2>
          <p class="post-description">{post.description}</p>
          <span class="read-more">Read Article →</span>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .blog-index {
    padding-top: 2rem;
    padding-bottom: 4rem;
  }

  .blog-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.8rem;
    margin-bottom: 1rem;
  }

  .subtitle {
    font-size: 1.1rem;
    color: var(--text-secondary);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
  }

  .posts-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 2rem;
  }

  .post-card {
    text-decoration: none;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    height: 100%;
  }

  .post-card:hover .read-more {
    transform: translateX(5px);
  }

  .post-card .card-body {
    padding: 1.75rem;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--card-bg);
  }

  .post-title {
    font-size: 1.35rem;
    font-weight: 700;
    color: var(--accent-primary);
    margin: 0 0 1rem 0;
    line-height: 1.3;
  }

  .post-description {
    color: var(--text-secondary);
    flex-grow: 1;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .read-more {
    color: var(--accent-primary);
    font-weight: 600;
    align-self: flex-start;
    transition: transform 0.2s;
  }

  .post-card:hover .read-more {
    transform: translateX(8px);
  }
</style>