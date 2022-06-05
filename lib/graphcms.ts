interface GraphQLVariables {
    [key: string]: string
}

async function fetchAPI(query: string, variables: GraphQLVariables = {}) {
    const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GRAPHCMS_AUTH_TOKEN}`,
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })
    const json = await res.json()

    if (json.errors) {
        console.error(json.errors)
        throw new Error("Failed to fetch API")
    }

    return json.data
}

export async function getAllPostsWithSlug() {
    const data = await fetchAPI(`
    {
      posts {
        slug
      }
    }
  `)
    return data.posts
}

export async function getAllPostsForHome(preview: boolean) {
    const data = await fetchAPI(
        `
    {
      posts(orderBy: publishedAt_DESC, first: 3) {
        title
        slug
        series
        date
        thumbnail {
          url(transformation: {image: {resize: {fit: crop, width: 2000, height: 1000}}})
        }
      }
    }
  `,
        {}
    )

    return data.posts
}

export async function getPost(slug: string, preview: boolean) {
    const data = await fetchAPI(
        `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(stage: $stage, where: {slug: $slug}) {
        title
        slug
        series
        content
      }
    }
  `,
        {
            stage: preview ? "DRAFT" : "PUBLISHED",
            slug,
        }
    )

    return data.post
}
