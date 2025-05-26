---
layout: home
hero:
  name: 团队成员
  tagline: Lordly Team & Contributors
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'team/吉王义昊.webp',
    name: '吉王义昊',
    title: 'Creator',
  },
  {
    avatar: 'team/tiger.jpg',
    name: '🐯两广总督-tiger',
    title: 'Co-Creator',
  },
  {
    avatar: 'team/duchuanbo.jpg',
    name: 'duchuanbo',
    title: 'Core Maintainer',
  },
  {
    avatar: 'team/kongqi.jpg',
    name: 'kongqi',
    title: 'Contributor',
  },
]
</script>

<VPTeamMembers
    :members="members"
  />