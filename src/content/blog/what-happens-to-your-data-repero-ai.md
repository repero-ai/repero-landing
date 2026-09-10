---
title: "What happens to your data when you entrust it to Repero AI"
description: "How Repero AI protects the documents and data entrusted to the platform: encryption, compartmentalization, key management, backups, and controlled operations."
pubDate: 2026-08-25
author: "Cédric Simon"
category: "Security"
image: "/blog/repero-ai-securite-donnees.png"
tags:
  - "security"
  - "encryption"
  - "privacy"
  - "data"
  - "workspaces"
lang: "en"
translationOf: "ce-qui-arrive-a-vos-donnees-repero-ai"
draft: false
---

![Illustration: documents protected in a secure Repero AI platform.](/blog/repero-ai-securite-donnees.png)

Entrusting a document to an artificial-intelligence assistant has become almost routine.

A PDF. A contract. Meeting notes. A working document. A conversation containing personal or professional information.

You upload the file, ask a question, and a few seconds later, you get an answer.

But a lot happens in between.

And one question often remains unanswered: **what really happens to that information once it enters the platform?**

At Repero AI, I do not think the right answer is simply: “trust me.”

Security is never absolute. No serious system should claim otherwise.

What we can do is explain the principles we use, the risks we seek to limit, and the choices we make to protect the information entrusted to the platform.

That is what I will do here.

## The starting principle: limit the damage if something goes wrong

Security is not only about trying to prevent every intrusion.

We also have to assume that, one day, a component could be compromised, misconfigured, or exposed by mistake. In that case, the question becomes: **what can access to that component actually reveal or allow?**

That is why Repero AI separates, as far as possible:

- data;
- the keys used to decrypt it;
- the secrets used by services;
- different workspaces;
- components exposed to the internet and those that remain internal.

The goal is simple: prevent a single access point from automatically granting access to everything else.

That is not a magic guarantee. It is a way to reduce the potential impact of a problem.

## Documents are encrypted

Documents uploaded to Repero AI are encrypted before they are stored persistently.

Storage itself is therefore not considered sufficient protection. In other words, if someone gained access to the storage, that should not let them directly read the documents kept there.

Encryption happens at the application level, before the data is sent to its final storage. This matters: storage keeps the data, but it should not need to understand its contents.

## Every workspace has its own context

Repero AI is organised around workspaces. This separation is not only for organising projects in the interface; it also shapes how data is protected.

Each workspace has its own cryptographic context. The idea is to avoid relying on a single global key used directly for every document on the platform.

Instead, the aim is to compartmentalise data. If a problem affects one workspace, it should not automatically open access to the others.

Again, this is not a promise of invulnerability. It is a way to keep a problem within its own scope as much as possible.

## An additional layer can be controlled by the user

Repero AI also provides an optional mechanism to strengthen a workspace’s protection with a secret supplied by the user.

The idea is to add another cryptographic barrier to the protection managed by the platform. The workspace then needs that user context before certain data can be used.

This approach is valuable because it gives the user more control. But it also brings extra responsibility.

The more protection depends on a key controlled by the user, the more seriously we must address recovery, loss, and management of that key.

Confidentiality is not only about adding protection. We must also ensure that protection remains usable in real-life situations.

## Keys are not stored alongside data

Encrypting data makes little sense if the key used to read it is stored right next to it.

Repero AI therefore separates encrypted data from the mechanisms used to manage its keys. The keys that protect workspace data are themselves protected before being persisted.

The platform’s technical secrets — for example, those needed to communicate with different providers — are also progressively being moved to dedicated secret-management services.

The aim is to reduce the amount of sensitive information kept directly in application configurations or on servers.

It may not be the most visible part of the product. But it is the kind of detail that matters when building something serious.

## Storage does not need to know your keys

Documents may be kept in external object storage. But that storage receives data that is already encrypted.

The storage provider therefore does not need to know the keys that decrypt documents in order to do its job. That distinction matters.

Storage exists to keep data. It should not be responsible for deciding who can read it.

## Backups are part of the problem too

Protecting active data while leaving its backups unprotected would obviously be inconsistent.

Repero AI’s databases therefore also have an encrypted backup mechanism to external storage. But a backup is only valuable if it can be restored.

It sounds obvious, yet it is sometimes forgotten. Restoration procedures are therefore part of the platform’s security and operational work too.

An unusable backup is not really a backup.

## Not everything needs to be reachable from the internet

Another important principle is limiting the exposure surface.

Users need access to the application and to the services required for it to work. That does not mean every technical component must be directly reachable from the internet.

Databases, internal services, orchestrators, and other infrastructure components should remain inside the platform’s internal network whenever possible.

Public entry points are deliberately limited. The fewer doors that are exposed, the fewer doors there are to watch.

## Production changes are controlled

Security does not depend on encryption alone.

A platform can have sound cryptographic protections and still become vulnerable because of a bad deployment, an incorrect configuration, or a change made too quickly.

Today, Repero AI uses a declarative deployment process. The intended state of the platform is described in its infrastructure, and changes pass through version control before they are applied.

This makes it possible to:

- keep a history of changes;
- compare the intended state with the state actually deployed;
- reduce manual changes made directly in production;
- make rollbacks easier when they are needed.

It is not spectacular. But being able to understand what changed, when, and why is extremely useful when a problem appears.

## Observability is part of security too

Preventing a problem is clearly preferable. Detecting it quickly when it occurs is essential.

Repero AI therefore has observability mechanisms to monitor application errors, services, and progressively the overall state of its infrastructure.

This work still needs to evolve. Today, certain outages and issues can already be detected. The goal is to go further: to identify early warning signs before they become visible to users.

## What I will not publish here

Transparency has a limit.

Explaining a platform’s security principles is useful. Publishing its complete network topology, secret names, detailed operating procedures, filtering rules, or the exact mechanisms used to access keys is not.

I want Repero AI’s security model to be understandable without turning that transparency into a manual that could be used against the platform.

We need to explain enough for the choices to be clear, but not so much that we publish information that would make those protections easier to bypass.

## Security is not “finished”

This is probably the most important point in this article.

**Repero AI’s security is not finished.** And it probably never will be.

Areas that will continue to evolve include:

- strengthening cryptographic key management;
- automated rotation of certain secrets and keys;
- improved monitoring and alerting;
- continuous hardening of the platform’s components;
- regular restoration tests;
- incident-management procedures;
- and, in time, external security audits.

Every new feature and every infrastructure change will also need to be assessed through this lens.

Security is not a box that gets checked once. It is a constraint that must accompany the product as it grows.

## Why talk about all this?

Because much of artificial intelligence today rests on a rather strange contradiction.

We are entrusting more and more information to these tools, yet we often know very little about what happens behind the interface.

Repero AI cannot completely remove the need to trust an online service. No service really can.

But I can try to do better than making a simple promise.

**Explain the principles. Reduce the risks. Compartmentalise. Encrypt. Observe. And keep improving the system.**

The past few weeks have been largely devoted to these foundations. They do not necessarily produce visible features. They do not always result in something to show in a screenshot.

But they now make it possible to ask a much more interesting question: **what will you entrust to Repero AI?**
