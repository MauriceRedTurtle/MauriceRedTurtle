import React from 'react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Container, Image, Icon, Label, Segment } from 'semantic-ui-react';

const TalkView = (props) => {
  const { content } = props;
  const color_mapping = {
    Beginner: 'green',
    Advanced: 'yellow',
    Professional: 'purple',
  };

  return (
    <Container id="page-talk">
      <h1 className="documentFirstHeading">
        {content.type_of_talk.title || content.type_of_talk.token}:{' '}
        {content.title}
      </h1>
      {content.description && (
        <p className="documentDescription">{content.description}</p>
      )}
      {content.audience?.map((item) => {
        let audience = item.title || item.token;
        let color = color_mapping[audience] || 'green';
        return (
          <Label key={audience} color={color}>
            {audience}
          </Label>
        );
      })}
      {content.details && (
        <div dangerouslySetInnerHTML={{ __html: content.details.data }} />
      )}
      <Segment clearing>
        {content.speaker && <Header dividing>{content.speaker}</Header>}
        {content.website ? (
          <p>
            <a href={content.website}>{content.company || content.website}</a>
          </p>
        ) : (
          <p>{content.company}</p>
        )}
        {content.email && (
          <p>
            Email: <a href={`mailto:${content.email}`}>{content.email}</a>
          </p>
        )}
        {content.twitter && (
          <p>
            Twitter:{' '}
            <a href={`https://twitter.com/${content.twitter}`}>
              {content.twitter.startsWith('@')
                ? content.twitter
                : '@' + content.twitter}
            </a>
          </p>
        )}
        {content.github && (
          <p>
            Github:{' '}
            <a href={`https://github.com/${content.github}`}>
              {content.github}
            </a>
          </p>
        )}
        {content.image && (
          <Image
            src={flattenToAppURL(content.image.scales.preview.download)}
            size="small"
            floated="right"
            alt={content.image_caption}
            avatar
          />
        )}
        {content.speaker_biography && (
          <div
            dangerouslySetInnerHTML={{
              __html: content.speaker_biography.data,
            }}
          />
        )}
      </Segment>
    </Container>
  );
};
export default TalkView;
