import { Client } from "@notionhq/client";

const notion = new Client({ auth: import.meta.env.VITE_NOTION_TOKEN });
const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

export const getNewsletters = async () => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: "Status",
        select: {
          equals: "Publicado"
        }
      },
      sorts: [
        {
          property: "PublicationDate",
          direction: "descending"
        }
      ]
    });

    return response.results.map(page => ({
      id: page.id,
      title: page.properties.Title.title[0].plain_text,
      slug: page.properties.Slug.rich_text[0].plain_text,
      bannerImage: page.properties.BannerImage.url,
      content: page.properties.Content.rich_text[0].plain_text,
      author: page.properties.Author.rich_text[0].plain_text,
      tags: page.properties.Tags.multi_select.map(tag => tag.name),
      publicationDate: page.properties.PublicationDate.date.start,
    }));
  } catch (error) {
    console.error("Error fetching newsletters from Notion:", error);
    throw error;
  }
};

export const getNewsletterBySlug = async (slug) => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        and: [
          {
            property: "Slug",
            rich_text: {
              equals: slug
            }
          },
          {
            property: "Status",
            select: {
              equals: "Publicado"
            }
          }
        ]
      }
    });

    if (response.results.length === 0) {
      throw new Error("Newsletter not found");
    }

    const page = response.results[0];
    const blocks = await notion.blocks.children.list({ block_id: page.id });

    return {
      id: page.id,
      title: page.properties.Title.title[0].plain_text,
      slug: page.properties.Slug.rich_text[0].plain_text,
      bannerImage: page.properties.BannerImage.url,
      content: page.properties.Content.rich_text[0].plain_text,
      author: page.properties.Author.rich_text[0].plain_text,
      tags: page.properties.Tags.multi_select.map(tag => tag.name),
      publicationDate: page.properties.PublicationDate.date.start,
      blocks: blocks.results,
    };
  } catch (error) {
    console.error("Error fetching newsletter by slug from Notion:", error);
    throw error;
  }
};